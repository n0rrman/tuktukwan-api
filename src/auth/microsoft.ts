import { Strategy as MicrosoftStrategy } from "passport-microsoft";


const strategy = new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    callbackURL: `${process.env.HOST}/api/auth/microsoft/callback`,
    scope: ['user.read'],
  },
  (accessToken: string, refreshToken: string, profile: any, done: CallableFunction) => {
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

export { strategy as microsoftStrategy }



