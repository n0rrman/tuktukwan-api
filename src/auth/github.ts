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
    console.log(req.user)
    const { id, username, provider } = profile;
    const pictureURL = profile._json.avatar_url || ""
    // if (req.user) {
      req.authUser = {user: req.user, method: "/"} ;
      req.session.authUser = {user: req.user, method: "session"}
    //   return done(null, await )
    // } else {
      return done(null, await authenticate(accessToken, id, username, pictureURL, provider))
    // }
  } else {
    return done(null, false)
  }
});
  

export { strategy as githubStrategy }


// {
//   method: 'GET',
//   url: '/api/auth/google/callback?code=4%2F0ATx3LY5MrI2HAfU3lImEiYBvnTatB2TErHI-jaMVGSy8V8MKcIXYgqvexsIQqt2y_0cpQA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=none',
//   header: {
//     host: 'tuktukwan.henriknorrman.com',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
//     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//     'accept-encoding': 'gzip, deflate, br, zstd',
//     'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
//     cookie: 'koa.sid=SICjU9aDOF2Lxjh_Lyik_9CXH9dGE5uX; koa.sid.sig=ShWGT2k3K8RKQK_TU4MIaXW17K0',
//     priority: 'u=0, i',
//     referer: 'https://tuktukwan.henriknorrman.com/',
//     'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"macOS"',
//     'sec-fetch-dest': 'document',
//     'sec-fetch-mode': 'navigate',
//     'sec-fetch-site': 'cross-site',
//     'sec-fetch-user': '?1',
//     'upgrade-insecure-requests': '1',
//     'x-forwarded-for': '10.0.0.2',
//     'x-forwarded-host': 'tuktukwan.henriknorrman.com',
//     'x-forwarded-port': '443',
//     'x-forwarded-proto': 'https',
//     'x-forwarded-server': 'da4735f1220f',
//     'x-real-ip': '10.0.0.2'
//   }
// }