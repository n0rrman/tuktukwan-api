import Router from "koa-router";
import ConsonantRepo from "../repos/consonant-repo";

const router = new Router();

router.get('/api/consonant', async (ctx, next) => { 
    try {
        const data = await ConsonantRepo.find();
        ctx.status = 200;
        ctx.body = data;
    } catch (err: unknown) {
        ctx.status = 500;
        ctx.body = err;
    }

    await next();

});

router.get('/api', async (ctx, next) => { 
    console.log("/api")
    ctx.status = 200;
    ctx.body = "/api"
    
    await next();
});

router.get('/', async (ctx, next) => { 
    console.log("/")
    ctx.status = 200;
    ctx.body = "It works!"
    
    
    await next();
});


export { router as consonantRouter };

