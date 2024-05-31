import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import CredentialRepo from "../repos/credential-repo"


const strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  console.log("strat profile",profile)
  if (profile) {
    const {id, displayName, provider} = profile;
    CredentialRepo.find(id, displayName, provider).then((auth_user) => {
      console.log("strat auth_user",auth_user)
      if (auth_user) {
        const { id, user_id } = auth_user;
        return done(null, {
          token: accessToken, 
          credential_id: id, 
          user_id: user_id 
        });
      } else {
        CredentialRepo.insert(id, displayName, provider);
        return done(null, {
          token: accessToken, 
          credential_id: id, 
          user_id: null 
        })
      }
    })
  } 
  return done(null, false)
});


export { strategy as googleStrategy };
