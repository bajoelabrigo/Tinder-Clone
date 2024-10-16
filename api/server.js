import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//Routes
import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import { connectDB } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messagesRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB();
});