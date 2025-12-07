import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  connectionStr: process.env.CONNECTION_SRT,
  jwt_secret: process.env.JWT_SECRET,
};

export default config;
