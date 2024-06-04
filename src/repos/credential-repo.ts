import { db } from "../database";


export default class CredentialRepo {
  
  static async authenticate(auth_id: string, auth_username: string, picture: string, auth_provider: string) {
    const row = await CredentialRepo.find(auth_id, auth_provider)
    
    if (!row) {
      return null
    }
    console.log("current row:", row)

    if ((row?.auth_username != auth_username) || (row?.auth_picture != picture)) {
      console.log("credential updated")
      console.log(row.auth_username, " -> ", auth_username)
      console.log(row.auth_pictureURL, " -> ", picture)
      db.query(`
        UPDATE credential
        SET auth_username=$1, auth_picture=$2
        WHERE auth_id=$3
          AND auth_provider=$4
      `, [auth_username, picture, auth_id, auth_provider]);
    }

    return { id: row.id, user_id: row.user_id }
  }

  
  static async find(auth_id: string, provider: string) {
    const { rows } = await db.query(`
    SELECT id, user_id, auth_username, auth_picture
    FROM credential
    WHERE auth_id = $1
      AND auth_provider = $2
    `, [ auth_id, provider ]);

    console.log("returned row: ", rows[0])
    return rows[0];
  }

  static async add(auth_id: string, username: string, picture: string, provider: string){
    const { rows } = await db.query(`
      INSERT INTO credential
        (auth_id, auth_username, auth_picture, auth_provider)
      VALUES
        ($1, $2, $3, $4)
      RETURNING id
    `, [ auth_id, username, picture, provider ])

    return rows[0].id;
  };

  static async linkUser(credential_id: string, user_id: number, verified: boolean) {
    console.log("cid",credential_id)
    console.log("uid",user_id)
    console.log("v",verified)
    const { rows } = await db.query(`
      UPDATE credential
      SET user_id=$2, user_verified=$3
      WHERE id=$1
    `, [ credential_id, user_id, verified ])

    return rows[0];
  }

  
  static update(){};
  static delete(){};
}



// id SERIAL PRIMARY KEY,
// username VARCHAR(64) REFERENCES "user"(username),
// password_hash VARCHAR(255),
// login_strategy strategy,
// login_id VARCHAR(128),
// login_username VARCHAR(128)