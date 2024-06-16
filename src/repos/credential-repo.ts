import { db } from "../database";


export default class CredentialRepo {
  
  static async authenticate(auth_id: string, auth_username: string, picture: string, auth_provider: string) {
    const row = await CredentialRepo.find(auth_id, auth_provider)
    
    if (!row) {
      return null
    }

    if ((row?.auth_username != auth_username) || (row?.auth_picture != picture)) {
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

  static async linkUser(credential_id: string, user_id: number) {
    const { rows } = await db.query(`
      UPDATE credential
      SET user_id=$2
      WHERE id=$1
    `, [ credential_id, user_id])

    return rows[0];
  }

  static async allOptions(user_id: number) {
    const { rows } = await db.query(`
      SELECT *
      FROM credential 
      WHERE user_id = $1
    `, [ user_id ])
  
    return rows;
  }

  static async unlinkUser(user_id: number, credential_id: string) {
    console.log("unlink called with (user_id, credential_id):", user_id, ", " , credential_id)
    await db.query(`
      DELETE FROM credential
      WHERE user_id = $1
        AND id = $2
    `, [ user_id, credential_id ])
  }
}
