import { Strategy as DiscordStrategy } from "passport-discord";
import CredentialRepo from "../repos/credential-repo";


const strategy = new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/discord/callback`,
  scope: ['identify'],
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("discord profile:", profile)
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

export { strategy as discordStrategy }



