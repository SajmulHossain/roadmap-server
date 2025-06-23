import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.Mongo_uri;
const secret_token = process.env.SECRET_TOKEN as string;

export { mongoURI, secret_token };
