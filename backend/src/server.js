import express from "express";
import dotenv from "dotenv"
// const express = require("express")
import cors from "cors";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
        origin:"http://localhost:5173",
}));
//middleware
//this middleware will parse json bodies: req.body
app.use(express.json());
app.use(rateLimiter);

//simple custom middleware to print
app.use((req,res,next) =>{
    console.log(`Request method is ${req.method} and req url is ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: ", PORT);
    }
    );
}) ;



