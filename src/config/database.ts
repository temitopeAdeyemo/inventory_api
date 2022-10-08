import { DataSource } from "typeorm";
import environment from "./environment";

const AppDataSource = new DataSource({
  type: "postgres",
  host: environment.dbHost,
  port: parseInt(environment.dbPort),
  username: environment.dbUsername,
  password: environment.dbPassword,
  database: environment.dbName,
  entities: ["./src/modules/**/models/entities/*.ts"],
  migrations: ["./src/shared/migrations/*.ts"],
  applicationName: "Inventory API",
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database");
  } catch (err: any) {
    console.error(
      "Something went wrong when connecting to the database:\n",
      err.stack
    );
  }
})();

export default AppDataSource;
