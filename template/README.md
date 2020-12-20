# Intera Microservice

Steps to run this project:

1. Run `docker-compose up -d` command (in docker directory)
2. Run `npm i` command (in root project directory)
3. Setup database settings inside `ormconfig.json` file
4. Change `.env` file
5. Run `npm start:dev` command  (in root project directory)

If you wanna run commands for typeorm (like create a migration) you can run:
  `npm run typeorm migration:create -- -n NameOfMigration`
