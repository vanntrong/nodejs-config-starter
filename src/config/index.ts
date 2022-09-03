import dotenv from "dotenv";

dotenv.config();

const config = process.env;

export const isProdEnv = config.NODE_ENV === "production";

export default config;
