import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { authenticate } from "./general";


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
    return done(null, await authenticate(accessToken, id, userPrincipalName, "", provider))
  } else {
    return done(null, false)
  }
});


export { strategy as microsoftStrategy }
