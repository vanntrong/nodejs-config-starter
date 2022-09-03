import config from "@/config";
import { DataSource } from "typeorm";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: ["src/models/**/*.ts"],
  logging: false,
  synchronize: true,
});

export default appDataSource;
