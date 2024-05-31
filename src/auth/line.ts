import CredentialRepo from "../repos/credential-repo";
const LineStrategy = require("passport-line").Strategy

const strategy = new LineStrategy({
  channelID: process.env.LINE_CLIENT_ID!,
  channelSecret: process.env.LINE_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/line/callback`,
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("line profile:", profile)
  if (profile) {
    const {id, username, provider} = profile;
    CredentialRepo.find(id, username, provider).then((auth_user) => {
      console.log("auth_user", auth_user)
      if (auth_user) {
        const { id, user_id } = auth_user;
        return done(null, {
          token: accessToken, 
          credential_id: id, 
          user_id: user_id 
        });
      } else {
        CredentialRepo.insert(id, username, provider);
        return done(null, {
          token: accessToken, 
          credential_id: id, 
          user_id: null 
        })
      }
    })
  } else {
    return done(null, false)
  }
});

export { strategy as lineStrategy }



