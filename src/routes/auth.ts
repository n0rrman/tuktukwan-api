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


const successfulLogin = async (ctx: ParameterizedContext, user: User) => {
    console.log("logged in:",ctx.isAuthenticated())
    ctx.status=200;
    await ctx.login(user);
    ctx.redirect("/")
    
} 


const failedLogin = (ctx: ParameterizedContext) => {
    console.log("logged in:",ctx.isAuthenticated())
    ctx.status=400;
    ctx.redirect("/")
}


// Discord
router.get('/api/auth/discord', async (ctx, next) => {
    await passport.authenticate('discord', { scope: ['profile'] })(ctx, next)
});
router.get('/api/auth/discord/callback', async (ctx, next) => {
    await passport.authenticate('discord', async (err, user) => {
        if (user) {
            successfulLogin(ctx, user);
        } else {
            failedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// GitHub
router.get('/api/auth/github', async (ctx, next) => {
    await passport.authenticate('github')(ctx, next)
});
router.get('/api/auth/github/callback', async (ctx, next) => {
    await passport.authenticate('github', async (err, user) => {
        if (user) {
            successfulLogin(ctx, user);
        } else {
            failedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// Google
router.get('/api/auth/google', async (ctx, next) => {
    await passport.authenticate('google', { scope: ['profile', 'email'] })(ctx, next)
});
router.get('/api/auth/google/callback', async (ctx, next) => {
    await passport.authenticate('google', async (err, user) => {
        if (user) {
            successfulLogin(ctx, user);
        } else {
            failedLogin(ctx)
        }
        await next()
    })(ctx, next)
});


// Microsoft
router.get('/api/auth/microsoft', async (ctx, next) => {
    await passport.authenticate('microsoft', {prompt: 'select_account'})(ctx, next)
});
router.get('/api/auth/microsoft/callback', async (ctx, next) => {
    await passport.authenticate('microsoft', async (err, user) => {
        if (user) {
            successfulLogin(ctx, user);
        } else {
            failedLogin(ctx)
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

