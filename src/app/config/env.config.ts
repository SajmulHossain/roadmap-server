import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.Mongo_uri;
const secret_token = process.env.SECRET_TOKEN;

export { mongoURI, secret_token };
