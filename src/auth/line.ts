import CredentialRepo from "../repos/credential-repo";
const LineStrategy = require("passport-line").Strategy

const strategy = new LineStrategy({
  channelID: process.env.LINE_CLIENT_ID!,
  channelSecret: process.env.LINE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/line/callback`,
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("line profile:", profile)
  if (profile) {
    const {id, displayName, provider} = profile;
    const pictureURL = profile.pictureUrl || ""
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


export { strategy as lineStrategy }



