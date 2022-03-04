# cselectives-db

## Description

This repository handles database management for an app.

The management of this database is done using **sqitch** as a means of managing updates,
reverts and verifications of SQL scripts. The back end database engine used is **Postgres**.

For more information on **sqitch** check https://sqitch.org
Currently for local development, we have to download sqitch.

- For debian systems, run: `apt-get install sqitch libdbd-pg-perl postgresql-client libdbd-sqlite3-perl sqlite3`
- For Downloading on Mac, see: https://sqitch.org/download/macos/

### Creating a Transaction

To add changes to the database, create a new transaction using the following command:
`sqitch add <transaction_name> --requires <schema_name> -n '<A Message Goes Here>'`

Eg: `sqitch add feedback --requires schema -n 'Description goes here'`

### sqitch execution

Sqitch introduces three main operations of database script execution,

1. **Deploy Opration** - This is the operation where the schemas and tables would be created based on the existing version of the scripts

2. **Verify Opration** - This operation which must be executed after `deploy` in order to make sure that the executed scripts are accurate and as expected produced a final result

3. **Revert Opration** - This operations reverts any changes made to the database, currently reverts to the immdiate previous git-commit version

In order to execute the scripts and deploy using sqitch use the following command once navigated to the root of the project folder.

For Deploying:

```
sqitch deploy db:pg://<databaseuser>:<password>@<database host>/<schema>
```

For Verification:

```
sqitch verify db:pg://<databaseuser>:<password>@<database host>/<schema>
```

For Reverting:

```
sqitch revert db:pg://<databaseuser>:<password>@<database host>/<schema>
```

> It must be noted that if the schema is deleted outside from sqitch such change would not be captured by sqitch. Hence it is always recommended to use sqitch `revert` to undo any changes applied to the backend database

### Testing Changes Locally

To test any changes you've made, you will need to apply the changes to a postgres database. To spin one up, run the following:

#### Start up a Postgres server

```
docker run --rm -itd --name app -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mydb -p 5432:5432 postgres
```

Then as an example, to apply your changes, run:

```
sqitch deploy db:pg://postgres:mysecretpassword@0.0.0.0:5432/mydb
```

To connect to the database locally via PSQL, run:

```
psql -U postgres -d mydb -h 0.0.0.0
```
