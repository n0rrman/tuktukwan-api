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
        'github',
        'google',
        'line',
        'microsoft'
      );

      CREATE TABLE credential(
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES "user"(id),
          user_verified BOOLEAN,
          auth_id VARCHAR(64) NOT NULL,
          auth_username VARCHAR(64),
          auth_provider strategy NOT NULL,
          auth_pictureURL VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE (auth_id, auth_provider)
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
