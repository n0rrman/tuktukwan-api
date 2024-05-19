import Koa from "koa";
import { consonantRouter } from "./routes/consonant";

export const app = new Koa();

app.use(consonantRouter.routes());
app.use(consonantRouter.allowedMethods());
