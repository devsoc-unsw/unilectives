# unilectives

A website to review UNSW courses and electives.

## Branch conventions

Type: feature, task, bugfix, refactor
[type]/UNI-XXX-[opt. description-in-kebab-case]

e.g. feature/UNI-777-the-brown-fox

## Running Locally

1. Add firebase secrets to a .env file for migration (speak to directors for this)
2. Run `source .env` once you have added the file
3. Run `docker compose up`
4. If you want to migrate the old data from v1 to v2 then you need to run these two commands:
   - `curl -X POST localhost:8080/api/v1/migrate/courses`
   - `curl -X POST localhost:8080/api/v1/migrate/reviews`
5. Run `npm run dev:local` in the `frontend` folder to run the frontend with the backend on your local machine.
