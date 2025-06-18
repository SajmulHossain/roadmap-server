import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3000;

let server: Server;

async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        server = await app.listen(port, () => {
          console.log(`Roadmap server is running on PORT: %d`, port);
        });
    } catch (error) {
        console.log(error);
    }
}

main();