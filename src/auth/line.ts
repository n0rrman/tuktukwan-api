const LineStrategy = require("passport-line").Strategy
import CredentialRepo from "../repos/credential-repo";
import { authenticate } from "./general";


const strategy = new LineStrategy({
  channelID: process.env.LINE_CLIENT_ID!,
  channelSecret: process.env.LINE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/line/callback`,
  passReqToCallback: true,
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("line profile:", profile)
  if (profile) {
    console.log(req.user)
    const { id, displayName, provider } = profile;
    const pictureURL = profile.pictureUrl || ""
    const user = await authenticate(accessToken, id, displayName, pictureURL, provider) 
    if (req.user && !user.user_id) {
      req.session.linkEvent = true;
      CredentialRepo.linkUser(user.credential_id, req.user.user_id);
      return done(null, req.user)
    } else {
      return done(null, user)
    }
  } else {
    return done(null, false)
  }
});


export { strategy as lineStrategy }
