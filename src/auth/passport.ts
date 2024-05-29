import passport from 'koa-passport';
import { Context, Next } from 'koa';

import { githubStrategy } from './github';
import { googleStrategy } from './google';
import { microsoftStrategy } from './microsoft';
import { localStrategy } from './local';
import { discordStrategy } from './discord';


export const passportMiddleware = async (ctx: any, next: Next) => {
    if (ctx.session && !ctx.session.regenerate) {
      ctx.session.regenerate = async (cb: any) => {
        await cb();
      };
    }
  
    if (ctx.session && !ctx.session.save) {
      ctx.session.save = async (cb: any) => {
        await cb();
      };
    }
    await next();
  };

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  interface User {
    id: string
  }
  
  passport.deserializeUser((user: User, done) => {
    if (user) {
        return done(null, user.id);
    } else {
        return done(null, null)
    }
  });
  

passport.use("github", githubStrategy)
passport.use("google", googleStrategy)
passport.use("discrd", discordStrategy)
passport.use("local", localStrategy)
passport.use("microsoft", microsoftStrategy)

export { passport };