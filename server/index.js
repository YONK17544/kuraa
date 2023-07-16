import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnection } from './config/db.config.js';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/posts.routes.js";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
dbConnection();
app.use(morgan("common"));
app.use(bodyParser.json({
    limit: "30mb", extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb", extended: true
}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, '/public/assets')))

const PORT = process.env.PORT ?? 8085;

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})