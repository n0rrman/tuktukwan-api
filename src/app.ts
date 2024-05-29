import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-generic-session';

import { passportMiddleware } from "./auth/passport";
import { consonantRouter } from "./routes/consonant";
import { authRouter } from "./routes/auth";


// Server
export const app = new Koa();
app.keys = [process.env.SERVER_KEY!];
app.use(bodyParser());


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
app.use(authRouter.allowedMethods());
app.use(consonantRouter.routes());
app.use(consonantRouter.allowedMethods());
