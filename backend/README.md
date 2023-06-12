# cselectives-api

## Local development

Install required packages: `npm install`

Build and run locally (what you will usually do for local development):
```
# Start db:
cd ../database
docker run --rm -itd --name cselectives-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -p 5432:5432 postgres
sqitch deploy db:pg://postgres:password@0.0.0.0:5432/mydb

```

```
# Start DragonflyDB (redis):
docker run --rm -d --name cselectives-cache -p 6379:6379 --ulimit memlock=-1 docker.dragonflydb.io/dragonflydb/dragonfly
```

```
# Start in development mode:
npm run dev
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

Then dragonfly (redis):
```
docker run --rm -d --network cselectives-network --name cselectives-cache -p 6379:6379 --ulimit memlock=-1 docker.dragonflydb.io/dragonflydb/dragonfly
```

Then backend server:
```
cd ../backend
docker build -t cselectives-api .
docker run --network cselectives-network --name cselectives-api -e POSTGRESQL_HOST=cselectives-db -e POSTGRESQL_USER=postgres -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=mydb -e REDIS_HOST=cselectives-cache -p 3030:3030 cselectives-api
```

## Running

```
npm start
```

