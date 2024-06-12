import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { authenticate } from "./general";
import CredentialRepo from "../repos/credential-repo";


const strategy = new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID!,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/microsoft/callback`,
  passReqToCallback: true,
  scope: ['user.read'],
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("microsoft profile:", profile)
  if (profile) {
    console.log(req.user)
    const {id, userPrincipalName, provider} = profile;
    const user = await authenticate(accessToken, id, userPrincipalName, "", provider) 
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


export { strategy as microsoftStrategy }
