import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import CredentialRepo from "../repos/credential-repo"


const strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  console.log("google profile:", profile)
  if (profile) {
    const {id, displayName, provider} = profile;
    const pictureURL = profile._json.picture || ""
    CredentialRepo.authenticate(id, displayName, pictureURL, provider).then((auth_user) => {
      if (auth_user) {
        return done(null, {
          token: accessToken, 
          credential_id: auth_user.id, 
          user_id: auth_user.user_id 
        });
      } else {
        CredentialRepo.add(id, displayName, pictureURL, provider).then((new_id) => {
          return done(null, {
            token: accessToken, 
            credential_id: new_id, 
            user_id: null 
          })
        });
      }
    })
  } else {
    return done(null, false)
  } 
});


export { strategy as googleStrategy };
