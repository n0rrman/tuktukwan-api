import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authenticate } from "./general";
import CredentialRepo from "../repos/credential-repo";


const strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/google/callback`,
  passReqToCallback: true,
}, async (req: any, accessToken, refreshToken, profile, done) => {
  console.log("google profile:", profile)
  if (profile) {
    console.log(req.user)
    const { id, displayName, provider } = profile;
    const pictureURL = profile._json.picture || ""
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


export { strategy as googleStrategy };
