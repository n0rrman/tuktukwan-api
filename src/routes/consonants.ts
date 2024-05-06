
import Router from "koa-router";

const router = new Router();

router.get('/api/consonants', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = "Hello World";
    console.log(ctx);
    await next();
});


export { router as consonantRouter };

