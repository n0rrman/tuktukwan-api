import { Strategy as LocalStrategy } from "passport-local";


// interface User {
//     id: string
// }


// var passport = require('passport');
// var LocalStrategy = require('passport-local');
// var crypto = require('crypto');

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// });

const strategy = new LocalStrategy(
    (username, password, done) => {
        console.log(username)
        console.log(password)
        // console.log(done)
        return done(null, {id: username})
        // User.findOne({ username: username }, function (err, user) {
        //   if (err) { return done(err); }
        //   if (!user) { return done(null, false); }
        //   if (!user.verifyPassword(password)) { return done(null, false); }
        //   return done(null, user);
        });
    //   }
    // clientID: process.env.GITHUB_CLIENT_ID!,
    // clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // callbackURL: `${process.env.HOST_URL}/api/auth/github/callback`,
    // authorizationURL: "https://github.com/login/oauth/authorize",
    // tokenURL: "https://github.com/login/oauth/access_token",
//   (accessToken: any, refreshToken: any, profile: any, done: any) => {
//     // console.log("accessToken", accessToken, "refreshToken:", refreshToken, "profile:",profile,)
//     console.log("id:", profile.id)
//     console.log("username:",profile.username)
//     // User.findOrCreate({ githubId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // request.session.regenerate(() => {
//     //     req.session.auth = profile.id;
//     // })
//     // });
//     const user = {user: profile.username, id: profile.id, accessToken}

//     return done(null, user)
// );

export { strategy as localStrategy }



