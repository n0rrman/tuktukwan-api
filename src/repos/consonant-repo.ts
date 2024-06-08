import { db } from "../database";


export default class ConsonantRepo {
  
  static async find() {
    const { rows } = await db.query('SELECT * FROM consonant;');

    return rows;
  }

  static async findById(id: string) {
    const { rows } = await db.query('SELECT * FROM consonant WHERE id = $1;', [
      id,
    ]);

    return (rows)[0];
  }
}

