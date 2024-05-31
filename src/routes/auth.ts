import Router from "koa-router";

import { passport } from "../auth/passport";
import { ParameterizedContext } from "koa";

const router = new Router();

interface User {
    user_id: string;
    token: string;
    credential_id: string;
}

const emptyUser: User = {
    user_id: "",
    token: "",
    credential_id: "",
}


const onSuccessfulLogin = async (ctx: ParameterizedContext, user: User) => {
    ctx.status=200;
    await ctx.login(user);
} 
const onSuccessfulLogin2 = async (ctx: ParameterizedContext, user: User) => {
    ctx.status=200;
    await ctx.login(user);
    ctx.redirect("back")
} 


const onFailedLogin = (ctx: ParameterizedContext) => {
    ctx.status=400;
}


// Discord
router.get('/api/auth/discord', async (ctx, next) => {
    await passport.authenticate('discord', { scope: ['profile'] })(ctx, next)
});
router.get('/api/auth/discord/callback', async (ctx, next) => {
    await passport.authenticate('discord', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true       
    }, async (err, user) => {
        console.log("discord auth_user:", user)
        if (user) {
            onSuccessfulLogin(ctx, user);
        } else {
            onFailedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// GitHub
router.get('/api/auth/github', async (ctx, next) => {
    await passport.authenticate('github')(ctx, next)
});
router.get('/api/auth/github/callback', async (ctx, next) => {
    await passport.authenticate('github', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true       
    }, async (err, user) => {
        console.log("github auth_user:", user)
        if (user) {
            onSuccessfulLogin(ctx, user);
        } else {
            onFailedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// Google
router.get('/api/auth/google', async (ctx, next) => {
    await passport.authenticate('google', { scope: ['profile', 'email'] })(ctx, next)
});
router.get('/api/auth/google/callback', async (ctx, next) => {
    await passport.authenticate('google', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true
    }, async (err, user) => {
        console.log("google auth_user:", user)
        if (user) {
            onSuccessfulLogin2(ctx, user);
        } else {
            onFailedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// Microsoft
router.get('/api/auth/microsoft', async (ctx, next) => {
    await passport.authenticate('microsoft', {prompt: 'select_account'})(ctx, next)
});
router.get('/api/auth/microsoft/callback', async (ctx, next) => {
    await passport.authenticate('microsoft', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true    
    }, async (err, user) => {
        console.log("microsoft auth_user:", user)
        if (user) {
            onSuccessfulLogin(ctx, user);
        } else {
            onFailedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// Local
router.post('/login', async (ctx, next) => {
    await passport.authenticate('local', { failureRedirect: '/login' },   
    async (err, user) => {
        console.log("req:",ctx.req)
        console.log("res:",ctx.res)
        if (user) {
            ctx.login(user)
            console.log("authenticated with github")
        } else {
            console.log("FAILED authenticated with github")
        }
        await next()
    }
)(ctx, next)
});


// Login status
router.get('/api/auth/status', async (ctx, next) => {
    ctx.status = 200; 
    ctx.body = ctx.state.user || emptyUser;
    
    console.log("logged in:",ctx.isAuthenticated())
    await next();
});


// Logout
router.get('/api/auth/logout', async (ctx, next) => {
    ctx.status = 200; 
    ctx.logout() 
    
    console.log("logged in:", ctx.isAuthenticated())
    await next();
});


export { router as authRouter };

