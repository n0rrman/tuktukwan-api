import { Strategy as GithubStrategy } from "passport-github2";
import CredentialRepo from "../repos/credential-repo";


const strategy = new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/github/callback`,
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("github profile:", profile)
  if (profile) {
    const { id, username, provider } = profile;
    const pictureURL = profile._json.avatar_url || ""
    CredentialRepo.authenticate(id, username, pictureURL, provider).then((auth_user) => {
      if (auth_user) {
        return done(null, {
          token: accessToken, 
          credential_id: auth_user.id, 
          user_id: auth_user.user_id 
        });
      } else {
        CredentialRepo.add(id, username, pictureURL, provider).then((new_id) => {
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


export { strategy as githubStrategy }
