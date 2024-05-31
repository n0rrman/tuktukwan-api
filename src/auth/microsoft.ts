import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import CredentialRepo from "../repos/credential-repo";


const strategy = new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID!,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/microsoft/callback`,
  scope: ['user.read'],
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  if (profile) {
    const {id, userPrincipalName, provider} = profile;
    CredentialRepo.find(id, userPrincipalName, provider).then((auth_user) => {
      if (auth_user) {
        const { id, user_id } = auth_user;
        return done(null, {
          token: accessToken, 
          credential_id: id, 
          user_id: user_id 
        });
      } else {
        CredentialRepo.insert(id, userPrincipalName, provider);
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


export { strategy as microsoftStrategy }
