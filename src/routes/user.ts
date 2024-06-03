import Router from "koa-router";


const router = new Router();

interface User {
    user_id: string;
    token: string;
    credential_id: string;
}


const emptyUser: User = {
    user_id: "",
    token: "",
    credential_id: "",
}

router.post('/api/user/new', async (ctx, next) => { 
    if (ctx.isAuthenticated()) {
        ctx.status = 200
        const { token, credential_id, user_id } = ctx.state.user
        const { username, display_name, email } = ctx.request.header;
        const requiredUserParams = !!token && !!credential_id && !user_id;
        const requiredHeaders = !!username && !!display_name && !!email;
        if (requiredUserParams && requiredHeaders) {
            const newUser = {
                user_id: 1206,
                token,
                credential_id
            }
            await ctx.logout()
            await ctx.login(newUser)
        }
    } else {
        ctx.status = 401
    }
    
    await next();
});


export { router as userRouter };

