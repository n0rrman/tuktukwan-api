import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import CredentialRepo from "../repos/credential-repo";


const strategy = new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID!,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/microsoft/callback`,
  scope: ['user.read'],
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("microsoft profile:", profile)
  if (profile) {
    const {id, userPrincipalName, provider} = profile;
    CredentialRepo.authenticate(id, userPrincipalName, "", provider).then((auth_user) => {
      if (auth_user) {
        return done(null, {
          token: accessToken, 
          credential_id: auth_user.id, 
          user_id: auth_user.user_id 
        });
      } else {
        CredentialRepo.add(id, userPrincipalName, "", provider).then((new_id) => {
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


export { strategy as microsoftStrategy }
