import { Strategy as GitHubStrategy } from "passport-github2";
// import { Strategy as GitHubStrategy } from "passport-oauth2";


// interface User {
//     id: string
// }

const strategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: `${process.env.HOST_URL}/api/auth/github/callback`,
    // authorizationURL: "https://github.com/login/oauth/authorize",
    // tokenURL: "https://github.com/login/oauth/access_token",
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    // console.log("accessToken", accessToken, "refreshToken:", refreshToken, "profile:",profile,)
    console.log("id:", profile.id)
    console.log("username:",profile.username)
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // request.session.regenerate(() => {
    //     req.session.auth = profile.id;
    // })
    // });
    const user = {user: profile.username, id: profile.id, accessToken}

    return done(null, user)
  }
);

export { strategy as githubStrategy }



