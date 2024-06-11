const LineStrategy = require("passport-line").Strategy
import { authenticate } from "./general";


const strategy = new LineStrategy({
  channelID: process.env.LINE_CLIENT_ID!,
  channelSecret: process.env.LINE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/line/callback`,
  passReqToCallback: true,
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("line profile:", profile)
  if (profile) {
    console.log(req)
    const { id, displayName, provider } = profile;
    const pictureURL = profile.pictureUrl || ""
    return done(null, await authenticate(accessToken, id, displayName, pictureURL, provider))
  } else {
    return done(null, false)
  }
});


export { strategy as lineStrategy }
