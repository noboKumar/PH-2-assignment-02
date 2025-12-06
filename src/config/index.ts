import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  connectionStr: process.env.CONNECTION_SRT,
};

export default config;
