import { Strategy as DiscordStrategy } from "passport-discord";

const strategy = new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: `${process.env.HOST_URL}/api/auth/discord/callback`,
    passReqToCallback: true,
    scope: ['identify']
  },
  (req, accessToken, refreshToken, profile, done) => {
    // console.log("accessToken", accessToken, "refreshToken:", refreshToken, "profile:",profile,)
    console.log("req:", req)
    console.log("accessToken:", accessToken)
    console.log("profile:", profile)
    console.log("refreshToken:", refreshToken)
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

export { strategy as discordStrategy }



