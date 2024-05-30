import { db } from "../database";


export default class UserRepo {
  static async find() {
    const { rows } = await db.query('SELECT * FROM "user";');
    return rows;
  }

  static async findById(id: string) {
    const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1;', [
      id,
    ]);

    return (rows)[0];
  }

  static insert(){};
  static update(){};
  static delete(){};
}

