import { db } from "../database";


export default class UserRepo {

  static async findById(id: string) {
    const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1;', [
      id,
    ]);

    return rows[0];
  }

  static async findByUsername(username: string) {
    const { rows } = await db.query('SELECT * FROM "user" WHERE username = $1;', [
      username,
    ]);

    return rows[0];
  }

  static async findByEmail(email: string) {
    const { rows } = await db.query('SELECT * FROM "user" WHERE email = $1;', [
      email,
    ]);

    return rows[0];
  }

  static async findByUsernameAndEmail(username: string, email: string) {
    const { rows } = await db.query(`
      SELECT * 
      FROM "user" 
      WHERE username = $1
      AND email = $2;`, [
      username, email
    ]);

    return rows[0];
  }

  static async add(username: string, displayName: string, email: string) {
    const { rows } = await db.query(`
      INSERT INTO "user"
        (username, display_name, email)
      VALUES
        ($1, $2, $3)
      RETURNING id`, [
        username, displayName, email
      ]);

    return rows[0].id;
  } 


  static update(){};
  static delete(){};
}

