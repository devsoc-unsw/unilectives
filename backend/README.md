# cselectives-api

## Local development

Install required packages: `npm install`

Build and run locally:

```
# Start in development mode:
POSTGRESQL_HOST=localhost POSTGRESQL_USER=postgres POSTGRESQL_PASSWORD=password POSTGRESQL_DATABASE=mydb JWT_SECRET=tom npm run dev
```

## Build & Deploy

To build: `npm run build`

To run: `npm start`

Test Docker build locally:

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

Then backend server:
```
cd ../backend
docker build -t cselectives-api .
docker run --network cselectives-network --name cselectives-api -e POSTGRESQL_HOST=cselectives-db -e POSTGRESQL_USER=postgres -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=mydb -p 3030:3030 cselectives-api
```

## Running

```
npm start
```

