import Router from "koa-router";

import ConsonantRepo from "../repos/consonant-repo";

const router = new Router();

router.get('/api/consonant', async (ctx, next) => { 
    const data = await ConsonantRepo.find();
    ctx.status = 200;
    ctx.body = data;

    await next();
});

router.get('/api/', async (ctx, next) => { 
    ctx.status = 200;
    ctx.body = "It works!"
        
    await next();
});


export { router as consonantRouter };

