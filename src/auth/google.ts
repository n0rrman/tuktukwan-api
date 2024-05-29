import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as GitHubStrategy } from "passport-oauth2";


// interface User {
//     id: string
// }

const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.HOST_URL}/api/auth/google/callback`,
    // authorizationURL: "https://github.com/login/oauth/authorize",
    // tokenURL: "https://github.com/login/oauth/access_token",
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    // console.log("accessToken", accessToken, "refreshToken:", refreshToken, "profile:",profile,)
    console.log("profile:", profile)
    console.log("id:", profile.id)
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

export { strategy as googleStrategy }



