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
        CREATE TYPE consonant_review_type AS ENUM (
            'class',
        );

        CREATE TABLE consonant_review (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES "user"(id),
            consonant_id INT REFERENCES "consonant"(id),
            type consonant_review_type,
            repetitions INT DEFAULT 0,
            easiness_factor REAL DEFAULT 2.5,
            interval INT DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (user_id, consonant_id, type)
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
        DROP TYPE consonant_review_type;
    `);
};