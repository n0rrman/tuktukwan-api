import Router from "koa-router";
import ConsonantRepo from "../repos/consonant-repo";

const router = new Router();

router.get('/api/consonant', async (ctx, next) => { 
    ctx.status = 200;
    ctx.body = await ConsonantRepo.find();
    return next();
});


export { router as consonantRouter };

