# cselectives-api

## Local development

Install required packages: `npm install`

Build and run locally:

The back end database engine used is **Postgres**.

The management of this database is done using **Prisma**. 
To test any changes you've made, you will need to apply the changes to a postgres database. To spin one up, run the following to start a postgres server:

#### Start up a Postgres server

```
docker run --rm -itd --name app -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -p 5432:5432 postgres
```

Then as an example, to apply your changes, run:

```
DATABASE_URL="postgresql://postgres:password@0.0.0.0:5432/mydb?schema=cselectives" npx prisma migrate dev
```
# Start in development mode:
POSTGRESQL_HOST=localhost POSTGRESQL_USER=postgres POSTGRESQL_PASSWORD=password POSTGRESQL_DATABASE=mydb JWT_SECRET=tom DATABASE_URL="postgresql://postgres:password@0.0.0.0:5432/mydb?schema=cselectives" npm run dev
```

## Build & Deploy

To build: `npm run build`

To run: `npm start`

Test Docker build locally:

```
npm install && npm run build
docker build -t cselectives-api .
docker run -p 3030:3030 cselectives-api
```

## Running

```
npm start
```

## Conventions

### Filenames

- Classes - {PascalCase}.ts
- Interfaces - I{PascalCase}.ts (Do prefix with I)
- Routers - {PascalCase}.router.ts
- Services - {PascalCase}.service.ts
- Schemas - {PascalCase}.schema.ts
