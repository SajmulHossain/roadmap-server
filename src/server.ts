import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT || 3000;

let server: Server;


async function main() {
    try {
        await mongoose.connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pknd7d9.mongodb.net/roadmapDB?retryWrites=true&w=majority&appName=Cluster0`
        );
        server = app.listen(port, () => {
          console.log(`Roadmap server is running on PORT: %d`, port);
        });
    } catch (error) {
        console.log(error);
    }
}

main();