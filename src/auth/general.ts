import CredentialRepo from "../repos/credential-repo";

export interface User {
    user_id: string,
    token: string,
    credential_id: string,
  }

export const authenticate = async (accessToken: string, id: string, username: string, picture: string, provider: string) => {
    return await CredentialRepo.authenticate(id, username, picture, provider).then((auth_user => {
        if (auth_user) {
            return {
                user_id: auth_user.user_id,
                token: accessToken, 
                credential_id: auth_user.id, 
            };
        } else {
            return CredentialRepo.add(id, username, picture, provider).then((new_id) => {
                return {
                user_id: null, 
                token: accessToken, 
                credential_id: new_id, 
                }
            })
        }
    }))
}