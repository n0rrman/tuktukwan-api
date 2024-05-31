import { Strategy as GitHubStrategy } from "passport-github2";
import CredentialRepo from "../repos/credential-repo";


const strategy = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/github/callback`,
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("strat profile",profile)
  if (profile) {
    const {id, username, provider} = profile;
    CredentialRepo.find(id, username, provider).then((auth_user) => {
      console.log("strat auth_user",auth_user)
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
  } 
  return done(null, false)
});


export { strategy as githubStrategy }
