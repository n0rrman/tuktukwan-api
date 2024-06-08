// import { Strategy as LocalStrategy } from "passport-local";
// import { authenticate } from "./general";


// const strategy = new LocalStrategy(
//  function (req, accessToken, refreshToken, profile, done) {
//   console.log("google profile:", profile)
//   if (profile) {
//     const { id, displayName, provider } = profile;
//     const pictureURL = profile._json.picture || ""
//     return done(null, await authenticate(accessToken, id, displayName, pictureURL, provider))
//   } else {
//     return done(null, false)
//   }
// });


// export { strategy as googleStrategy };
