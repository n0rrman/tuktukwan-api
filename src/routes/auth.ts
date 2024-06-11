import Router from "koa-router";

import CredentialRepo from "../repos/credential-repo";
import { passport } from "../auth/passport";
import { authenticate } from "../auth/general";

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
    if (process.env.NODE_ENV === "production") {
        await passport.authenticate('line')(ctx, next)
    } else {
        const user = await authenticate("1412234", "line23", "line user", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png", "line")
        console.log(user)
        await ctx.login(user)
        console.log(ctx.state.user)
        ctx.redirect("http://localhost:3000")
    }
});

// GitHub
router.get('/api/auth/github', async (ctx, next) => {
    if (process.env.NODE_ENV === "production") {
        await passport.authenticate('github')(ctx, next)
    } else {
        const user = await authenticate("518293", "github123", "github user", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfanF5A4vFagSzr3uB5imAHDWIRPR2ThTUjw&s", "github")
        console.log(user)
        await ctx.login(user)
        ctx.redirect("http://localhost:3000")
    }
});

// Google
router.get('/api/auth/google', async (ctx, next) => {
    if (process.env.NODE_ENV === "production") {
        await passport.authenticate('google', { scope: ['profile', 'email'] })(ctx, next)
    } else {
        const user = await authenticate("231234", "google123", "google user", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0MJ95PWDM-utj31Cv6zrSqAmfFE-oRvvs4w&s", "google")
        console.log(user)
        await ctx.login(user)
        ctx.redirect("http://localhost:3000")
    }
});

// Microsoft
router.get('/api/auth/microsoft', async (ctx, next) => {
    if (process.env.NODE_ENV === "production") {
        await passport.authenticate('microsoft', {prompt: 'select_account'})(ctx, next)
    } else {
        const user = await authenticate("62123", "microsoft123", "microsoft user", "https://i.pinimg.com/736x/d3/d5/81/d3d581d91037cbcec254dbd8c4ea558a.jpg", "microsoft")
        console.log(user)
        await ctx.login(user)
        ctx.redirect("http://localhost:3000")
    }
});


// LINE callback
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


// GitHub callback
router.get('/api/auth/github/callback', async (ctx, next) => {
    await passport.authenticate('github', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        keepSessionInfo: true       
    }, async (err, user) => {
        console.log("github auth_user:", user)
        console.log("ctx:", ctx)
        console.log("session:", ctx.session?.authUser)
        console.log("state:", ctx.state.authUser)
        if (user) {
            await ctx.login(user);
        }
        ctx.redirect("/")
        await next()
    })(ctx, next)
});


// Google callback
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


// Microsoft callback
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
router.get('/api/auth/credentials', async (ctx, next) => {
    const { user_id } = ctx.state.user;
    if (ctx.isAuthenticated() && !!user_id) {
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
    console.log(ctx.isAuthenticated())
    ctx.body = ctx.state.user || emptyUser;
    
    console.log("logged in:",ctx.isAuthenticated())
    await next();
});


// Logout
router.get('/api/auth/logout', async (ctx, next) => {
    ctx.status = 200; 
    console.log(ctx.state.user)
    await ctx.logout() 
    
    console.log("logged in:", ctx.isAuthenticated())
    console.log(ctx.state.user)
    await next();
});


export { router as authRouter };

