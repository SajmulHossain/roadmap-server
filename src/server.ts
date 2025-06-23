import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { mongoURI } from "./app/config/env.config";
const port = process.env.PORT || 3000;


let server: Server;


async function main() {
    try {
        await mongoose.connect(mongoURI as string);
        server = app.listen(port, () => {
          console.log(`Roadmap server is running on PORT: %d`, port);
        });
    } catch (error) {
        console.log(error);
    }
}

main();