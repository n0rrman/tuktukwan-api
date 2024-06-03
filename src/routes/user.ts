import Router from "koa-router";
import UserRepo from "../repos/user-repo";
import CredentialRepo from "../repos/credential-repo";


const router = new Router();

interface User {
    user_id: string;
    token: string;
    credential_id: string;
}

router.get('/api/user/check', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.status = 200

        let status = { };
        const { username, email } = ctx.request.header;
        if (username) {
            status = { ...status, username: !!( await UserRepo.findByUsername(username.toString())) }
        } 
        
        if (email) {
            status = { ...status, email: !!(await UserRepo.findByEmail(email.toString())) }
        }

        ctx.body = status
    } else {
        ctx.status = 400
    }

    await next();
})

router.post('/api/user/new', async (ctx, next) => { 
    if (ctx.isAuthenticated()) {
        ctx.status = 200
        const { token, credential_id, user_id } = ctx.state.user
        const { username, display_name, email } = ctx.request.header;
        const requiredUserParams = !!token && !!credential_id && !user_id;
        const requiredHeaders = !!username && !!display_name && !!email;
        if (requiredUserParams && requiredHeaders) {
            const userId = await UserRepo.add(username.toString(), display_name.toString(), email.toString());
            const newUser = {
                user_id: userId,
                token,
                credential_id
            }
            await ctx.logout()
            await ctx.login(newUser)
            await CredentialRepo.linkUser(credential_id, user_id, true)
        }
    } else {
        ctx.status = 401
    }
    
    await next();
});


export { router as userRouter };

