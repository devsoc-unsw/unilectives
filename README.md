# cselectives-v2

A website to review UNSW courses and electives.

## Branch conventions

Type: feature, task, bugfix, refactor
Jira Ticket: ELEC-XXX

{type}/{jira-ticket}

e.g. feature/ELEC-777

## Running Locally

1. Add firebase secrets to a .env file for migration (speak to directors for this)
2. `docker compose up`
3. If you want to migrate the old data from v1 to v2 then you need to run these two commands:
   - `curl -X POST localhost:8080/api/v1/migrate/courses`
   - `curl -X POST localhost:8080/api/v1/migrate/reviews`
4. `npm run dev:local` in the `frontend` folder to run the frontend with the backend on your local machine.
