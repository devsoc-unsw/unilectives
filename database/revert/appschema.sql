-- Revert cselectives:appschema from pg

BEGIN;

DROP TABLE app;

COMMIT;
