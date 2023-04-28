# cselectives-db

## Description

This repository handles database management for an app.

The back end database engine used is **Postgres**.
The management of this database is done using **Prisma**. Prisma is able to both add migrations 
to the schema of the database and also provide an ORM for the backend (which is *currently* written
using typeORM).

For more information on **Prisma** check https://prisma.io

## Local development
For local development, we simply have to hit npm install to download the necessary packages.

Install required packages: `npm install`

### Prisma use

Prisma has two main CLI operations that can be used for database script execution and to add migrations to the database,

1. **Prisma Migrate** - : An operation for applying database schema changes in a version-controlled manner. It creates a new migration folder containing
  changes made on each on use.

2. **Prisma Diff** - An operation to compare two schemas and create a migration that will take the first schema to the state of the second schema.

In order to execute scripts and deploy using Prisma, use the following commands once the local development environment has been set up.

For Migrating:

```
npx prisma migrate dev
```

For Diff:

```
prisma migrate diff --from-... <source1> --to-... <source2> --script > <outputFilename>.sql
```

>The --from... and --to tags... can be set to a few options that can be found in the docs linked above.


### Testing Changes Locally

To test any changes you've made, you will need to apply the changes to a postgres database. To spin one up, run the following to start a postgres server:

#### Start up a Postgres server

```
docker run --rm -itd --name app -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -p 5432:5432 postgres
```

Then as an example, to apply your changes, run:

```
DATABASE_URL="postgresql://postgres:password@0.0.0.0:5432/mydb?schema=cselectives" npx prisma migrate dev
```

To optionally connect to the database and verify changes locally via PSQL, run:

```
psql -U postgres -d mydb -h 0.0.0.0
```