import { Strategy as GithubStrategy } from "passport-github2";
import { authenticate } from "./general";
import CredentialRepo from "../repos/credential-repo";


const strategy = new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/github/callback`,
  passReqToCallback: true,
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("github profile:", profile)
  if (profile) {
    console.log(req.user)
    const { id, username, provider } = profile;
    const pictureURL = profile._json.avatar_url || ""
    const user = await authenticate(accessToken, id, username, pictureURL, provider) 
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
  

export { strategy as githubStrategy }

