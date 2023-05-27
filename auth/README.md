cselectives-auth

## Development

This application uses bun which can be installed from: https://bun.sh
To start the development server run:

```bash
bun run dev
```

## Build & Deploy

Start a local docker network:

```
docker network create cselectives-network
```

First start the database:

```
cd ../database
docker run --rm -itd --network cselectives-network --name cselectives-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -p 5432:5432 postgres
sqitch deploy db:pg://postgres:password@0.0.0.0:5432/mydb
```

Then auth server:

```
cd ../auth
docker build -t cselectives-auth .
docker run --network cselectives-network --name cselectives-auth -e POSTGRESQL_HOST=cselectives-db -e POSTGRESQL_USER=postgres -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=mydb -p 8080:8080 cselectives-auth
```
