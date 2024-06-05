import CredentialRepo from "../repos/credential-repo";

export const authenticate = async (accessToken: string, id: string, username: string, picture: string, provider: string) => {
    return CredentialRepo.authenticate(id, username, picture, provider).then((auth_user) => {
        if (auth_user) {
            return {
                token: accessToken, 
                credential_id: auth_user.id, 
                user_id: auth_user.user_id 
            };
        } else {
            CredentialRepo.add(id, username, picture, provider).then((new_id) => {
                return {
                token: accessToken, 
                credential_id: new_id, 
                user_id: null 
                }
            })
        }
    })
}