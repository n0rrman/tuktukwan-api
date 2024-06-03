import { db } from "../database";


export default class CredentialRepo {
  
  static async authenticate(auth_id: string, auth_username: string, pictureURL: string, auth_provider: string) {
    const row = await CredentialRepo.find(auth_id, auth_provider)

    if (!row) {
      return null
    }

    if ((row?.auth_username != auth_username) || (row?.auth_pictureURL != pictureURL)) {
      console.log("credential updated")
      console.log(row.auth_username, " -> ", auth_username)
      console.log(row.auth_pictureURL, " -> ", pictureURL)
      db.query(`
        UPDATE credential
        SET auth_username=$1, auth_pictureURL=$2
        WHERE auth_id=$3
          AND auth_provider=$4
      `, [auth_username, pictureURL, auth_id, auth_provider]);
    }

    return { id: row.id, user_id: row.user_id }
  }

  static async find(auth_id: string, provider: string) {
    const { rows } = await db.query(`
    SELECT id, user_id, auth_username, auth_pictureURL
    FROM credential
    WHERE auth_id = $1
      AND auth_provider = $2
    `, [ auth_id, provider ]);

    return rows[0];
  }

  static async add(auth_id: string, username: string, pictureURL: string, provider: string){
    const { rows } = await db.query(`
      INSERT INTO credential
        (auth_id, auth_username, auth_pictureURL, auth_provider)
      VALUES
        ($1, $2, $3, $4)
      RETURNING id
    `, [ auth_id, username, pictureURL, provider ])

    return rows[0].id;
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