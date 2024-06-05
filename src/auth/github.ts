import { Strategy as GithubStrategy } from "passport-github2";
import { authenticate } from "./general";


const strategy = new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: `${process.env.HOST_URL}/api/auth/github/callback`,
  passReqToCallback: true,
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log("github profile:", profile)
  if (profile) {
    const { id, username, provider } = profile;
    const pictureURL = profile._json.avatar_url || ""
    return done(null, await authenticate(accessToken, id, username, pictureURL, provider))
  } else {
    return done(null, false)
  }
  });
  

export { strategy as githubStrategy }
