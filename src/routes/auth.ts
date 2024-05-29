import Router from "koa-router";

import { passport } from "../auth/passport";

const router = new Router();



// githuv
    router.get('/api/auth/github', async (ctx, next) => {
        await passport.authenticate('github')(ctx, next)
    });
    router.get('/api/auth/github/callback', async (ctx, next) => {
       await passport.authenticate('github', {
        successReturnToOrRedirect: '/api/auth/status',
        failureRedirect: '/api'       
    }, async (err, user) => {
        // console.log(ctx)
        if (user) {

            console.log("authenticated with github")
            console.log(user)
            await ctx.login(user)
            ctx.redirect("/api/auth/status")
            console.log("logged in:",ctx.isAuthenticated())
        } else {
            console.log("authenticated with github FAILED")        
            ctx.redirect("/api/auth/failed")
        }
    })(ctx, next)
    });


// Google
router.get('/api/auth/google', async (ctx, next) => {
    await passport.authenticate('google', { scope: ['profile'] })(ctx, next)
});
router.get('/api/auth/google/callback', async (ctx, next) => {
   await passport.authenticate('google', {
    successReturnToOrRedirect: '/api/auth/status',
    failureRedirect: '/api'       
}, async (err, user) => {
    // console.log(ctx)
    if (user) {
        console.log("authenticated with google")
        console.log(user)
        await ctx.login(user)
        ctx.redirect("/api/auth/status")
        console.log("logged in:",ctx.isAuthenticated())
    } else {
        console.log("authenticated with discord FAILED")        
        ctx.redirect("/api/auth/failed")
    }
})(ctx, next)
});




// Local
router.post('/login', async (ctx, next) => {
    await passport.authenticate('local', { failureRedirect: '/login' },   
   async (err, user) => {
        if (user) {
            ctx.login(user)
            console.log("authenticated with github")
        } else {
            console.log("FAILED authenticated with github")
        }
    }
    )(ctx, next)
  });



    // Microsoft
    router.get('/api/auth/microsoft', async (ctx, next) => {
        await passport.authenticate('microsoft', {prompt: 'select_account'})(ctx, next)
    });
    router.get('/api/auth/microsoft/callback', async (ctx, next) => {
       await passport.authenticate('microsoft', {
        successReturnToOrRedirect: '/api/auth/status',
        failureRedirect: '/api'       
    }, async (err, user) => {
        // console.log(ctx)
        if (user) {

            console.log("authenticated with microsoft")
            console.log(user)
            await ctx.login(user)
            ctx.redirect("/api/auth/status")
            console.log("logged in:",ctx.isAuthenticated())
        } else {
            console.log("authenticated with discord FAILED")        
            ctx.redirect("/api/auth/failed")
        }
    })(ctx, next)
    });


router.get('/api/auth/status', async (ctx, next) => {
    ctx.status = 200; 

    console.log("ctx:",ctx.session)

    var session = ctx.session!
    session.testing = parseInt(session.testing) || 0
    session.testing++

    // console.log(session.testing)

    // ctx.body = session




    // ctx.logout()
    console.log("logged in:",ctx.isAuthenticated())
    console.log("logged out:",ctx.isUnauthenticated())
    // const test = yield this.session;


    await next();

});

router.get('/api/redirect', async (ctx, next) => {
    ctx.status = 200; 
    ctx.redirect("/api/consonant")
    await next();
});

router.get('/api/auth/failed', async (ctx, next) => {
    ctx.status = 200; 
    ctx.body = "login failed..."
    await next();
});

router.get('/api/auth/logout', async (ctx, next) => {
    ctx.status = 200; 


    ctx.logout() 
    console.log("logged in:",ctx.isAuthenticated())


    await next();
});


export { router as authRouter };
