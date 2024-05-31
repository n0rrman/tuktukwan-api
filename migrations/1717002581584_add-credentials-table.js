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
        'line',
        'github',
        'google',
        'local',
        'microsoft'
      );

      CREATE TABLE credential(
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES "user"(id),
          auth_id VARCHAR(64) NOT NULL,
          auth_username VARCHAR(64),
          auth_provider strategy NOT NULL,
          auth_pictureURL VARCHAR(255),
          hash_password VARCHAR(64),
          UNIQUE (auth_id, auth_provider),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
        DROP TABLE credential;
        DROP TYPE strategy;
    `);
};
