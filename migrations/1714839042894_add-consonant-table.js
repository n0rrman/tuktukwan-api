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
    CREATE TYPE class AS ENUM (
        'high',
        'mid',
        'low-paired',
        'low-unpaired'
      );
      
      CREATE TYPE sound AS ENUM (
          'k',
          'p',
          't',
          'm',
          'n',
          'ng',
          's',
          'vowel',
          '-'
      );
      
      CREATE TABLE consonant(
          id SERIAL PRIMARY KEY,
          character CHAR(1) UNIQUE,
          class class NOT NULL,
          initial_pariboon VARCHAR(5) NOT NULL,
          final_pariboon sound NOT NULL,
          sample_word VARCHAR(64) NOT NULL,
          sample_sound VARCHAR(128) NOT NULL,
          sample_pariboon VARCHAR(64) NOT NULL,
          sample_translation VARCHAR(64) NOT NULL,
          obsolete BOOLEAN NOT NULL
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
        DROP TABLE consonant;
        DROP TYPE sound;
        DROP TYPE class;
    `);
};
