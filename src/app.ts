import Koa from "koa";
import { consonantRouter } from "./routes/consonant";

export const app = new Koa();

let x = 0;

app.use((ctx) => {console.log(ctx, x++)});
app.use(consonantRouter.routes());
app.use(consonantRouter.allowedMethods());
