import dotenv from "dotenv";
import path from "path";

const envName = process.env.ENV || "sit";
dotenv.config({
  path: path.resolve(__dirname, `${envName.toLowerCase()}.env`),
});
