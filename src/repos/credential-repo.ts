import { db } from "../database";


export default class CredentialRepo {
  
  static async find(id: string, username: string, provider: string) {
    const { rows } = await db.query(`
      SELECT id, user_id
      FROM credential
      WHERE auth_id = $1
        AND auth_username = $2
        AND auth_provider = $3;
      `, [ id, username, provider ]);
    
    return (rows)[0];
  }
  static async insert(id: string, username: string, provider: string){
    db.query(`
      INSERT INTO credential
        (auth_id, auth_username, auth_provider)
      VALUES
        ($1, $2, $3);
    `, [ id, username, provider ])
  };
  
  static update(){};
  static delete(){};
}



// id SERIAL PRIMARY KEY,
// username VARCHAR(64) REFERENCES "user"(username),
// password_hash VARCHAR(255),
// login_strategy strategy,
// login_id VARCHAR(128),
// login_username VARCHAR(128)