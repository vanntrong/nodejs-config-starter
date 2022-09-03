import config from "@/config";
import logger from "@/config/logger";
import Redis from "ioredis";

const redisClient = new Redis({
  port: Number(config.REDIS_PORT),
  host: config.REDIS_HOST,
  username: "default",
  password: config.REDIS_PASSWORD,
});

redisClient.on("connect", () => console.info("Redis Client connected"));
redisClient.on("error", (err) => console.error("Redis Client error", err));
redisClient.on("reconnecting", () =>
  console.warn("Redis Client is reconnecting")
);

export default redisClient;
