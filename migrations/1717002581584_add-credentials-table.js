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
    CREATE TYPE strategy AS ENUM (
        'discord',
        'github',
        'google',
        'local',
        'microsoft'
      );

      CREATE TABLE credential(
          id SERIAL PRIMARY KEY,
          username VARCHAR(64) REFERENCES "user"(username),
          password_hash VARCHAR(255),
          login_strategy strategy,
          login_id VARCHAR(128),
          login_username VARCHAR(128)
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
        DROP TABLE credentials;
        DROP TYPE strategy;
    `);
};
