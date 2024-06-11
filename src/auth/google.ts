import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authenticate } from "./general";


const strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/google/callback`,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  console.log("google profile:", profile)
  if (profile) {
    console.log(req.user)
    const { id, displayName, provider } = profile;
    const pictureURL = profile._json.picture || ""
    return done(null, await authenticate(accessToken, id, displayName, pictureURL, provider))
  } else {
    return done(null, false)
  }
});


export { strategy as googleStrategy };
