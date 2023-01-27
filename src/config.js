import { config } from 'dotenv';

config();

export default {
  host: process.env.HOST || "Host not found",
  port: process.env.PORT || "Port not found",
  user: process.env.USER || "User not found",
  password: process.env.PASSWORD || "Password not found",
  database: process.env.DATABASE || "Database not found"
};