-- Deploy cselectives:appschema to pg

BEGIN;

CREATE TABLE names (
    id TEXT,
    name TEXT
);

COMMIT;
