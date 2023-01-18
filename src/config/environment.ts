import dotenv from "dotenv";
dotenv.config();
console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_NAME || "wheelerBlog"
);
export default {
  port: process.env.PORT || "8000",
  nodeEnv: process.env.NODE_ENV || "production",
  saltRounds: process.env.SALT_ROUNDS || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    "03afc0820d376f9fdb1e8faa460902c6f74705feb01f101c480f4205964e3e10",
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    "7bfd6e6512e8ac8b56e31cfbdbe767892a87075039d4a524b2b2ddcb2fb2c69f",
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: process.env.REDIS_PORT || "6379",
  sendgridApiKey: process.env.SENDGRID_API_KEY || "",
  defaultMailSender: process.env.DEFAULT_MAIL_SENDER || "",
  amqpUrl: process.env.AMQP_URL || "amqp://localhost:5672",
  cloudinaryURL: process.env.CLOUDINARY_URL || "",
  secretKey: process.env.SECRET_KEY || "",
  // dbHost: process.env.DB_HOST || "localhost",
  // dbPort: process.env.DB_PORT || "5050",
  // dbUsername: process.env.DB_USERNAME || "postgres",
  // dbPassword: process.env.DB_PASSWORD || "123456789",
  // dbName: process.env.DB_NAME || "wheelerBlog",
  //
  dbHost: "db",
  dbPort: "5432",
  dbUsername: "postgres",
  dbPassword: "123456789",
  dbName: "inventoryAPI",
  defaultUserFirstName: process.env.DEFAULT_USER_FIRST_NAME || "John",
  defaultUserLastName: process.env.DEFAULT_USER_LAST_NAME || "Doe",
  defaultUserEmail: process.env.DEFAULT_USER_EMAIL || "johndoe@example.com",
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD || "123456",
};
