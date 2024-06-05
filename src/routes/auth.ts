import Router from "koa-router";

import { passport } from "../auth/passport";
import CredentialRepo from "../repos/credential-repo";

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


// LINE
router.get('/api/auth/line', async (ctx, next) => {
    await passport.authenticate('line')(ctx, next)
});
router.get('/api/auth/line/callback', async (ctx, next) => {
    await passport.authenticate('line', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true       
    }, async (err, user) => {
        console.log("line auth_user:", user)
        if (user) {
            await ctx.login(user);
        }
        ctx.redirect("/")
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
            await ctx.login(user);
        }
        ctx.redirect("/")
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
            await ctx.login(user);
        }
        ctx.redirect("/")
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
            await ctx.login(user);
        }
        ctx.redirect("/")
        await next()
    })(ctx, next)
});


// Get all credential options for authenticated in user
router.get('/api/auth/options', async (ctx, next) => {
    const { user_id } = ctx.state.user;
    if (ctx.isAuthenticated() && user_id) {
        ctx.status = 200;  
        const options = await CredentialRepo.allOptions(user_id)
        ctx.body = options; 
    } else {
        ctx.status = 401; 
    }
    await next();
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

