import Koa from "koa";
import { consonantRouter } from "./routes/consonants";

export const app = new Koa();

app.use(consonantRouter.routes());