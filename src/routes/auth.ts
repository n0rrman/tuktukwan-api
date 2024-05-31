import Router from "koa-router";

import { passport } from "../auth/passport";

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


// Discord
router.get('/api/auth/discord', async (ctx, next) => {
    ctx.redirect("https://discord.com/oauth2/authorize?client_id=1245246391329226765&response_type=code&redirect_uri=https%3A%2F%2Ftuktukwan.henriknorrman.com%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify")
    await next()
    // await passport.authenticate('discord', { scope: ['profile'] })(ctx, next)
});
router.get('/api/auth/discord/callback', async (ctx, next) => {
    await passport.authenticate('discord', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true       
    }, async (err, user) => {
        console.log("discord auth_user:", user)
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

