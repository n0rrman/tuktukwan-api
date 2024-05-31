import passport from 'koa-passport';
import { Next } from 'koa';

import { githubStrategy } from './github';
import { googleStrategy } from './google';
import { microsoftStrategy } from './microsoft';
import { localStrategy } from './local';
import { lineStrategy } from './line';

interface User {
  user_id: string,
  token: string,
  credential_id: string,
}

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

passport.serializeUser((user: any, done) => {
  process.nextTick(() => {
    return done(null, {
      user_id: user.user_id,
      token: user.token,
      credential_id: user.credential_id
    });
  });
});

passport.deserializeUser((user: User, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});


passport.use("github", githubStrategy)
passport.use("google", googleStrategy)
passport.use("line", lineStrategy)
passport.use("local", localStrategy)
passport.use("microsoft", microsoftStrategy)

export { passport };