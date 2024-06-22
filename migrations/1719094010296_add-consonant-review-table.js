/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql(`
      CREATE TABLE consonant_review (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES "user"(id),
          consonant_id INT REFERENCES "consonant"(id),
          -- first review?
          -- streak?
          -- history? 
          UNIQUE (user_id, consonant_id)
      );
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE consonant_review;
    `);
};