import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-generic-session';
import cors from '@koa/cors';

import { passportMiddleware } from "./auth/passport";
import { consonantRouter } from "./routes/consonant";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";


// Server
export const app = new Koa();
app.keys = [process.env.SERVER_KEY!];
app.use(bodyParser());
app.use(cors({ credentials: true }));


// Redis store
const redisStore = require('koa-redis');
const redis =redisStore({host: "session_storage", port: 6379}) 
app.use(session({ store: redis}));


// Session
app.use(passport.initialize());
app.use(passport.session());
app.use(passportMiddleware);


// Routes
app.use(authRouter.routes());
app.use(consonantRouter.routes());
app.use(userRouter.routes());
app.use(authRouter.allowedMethods());
app.use(consonantRouter.allowedMethods());
app.use(userRouter.allowedMethods());
