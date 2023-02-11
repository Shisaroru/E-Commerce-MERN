import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/userRouter.js"
import categoryRoute from "./routes/categoryRouter.js"
import productRoute from "./routes/productRouter.js"
import paymentRoute from "./routes/paymentRouter.js"
import path from 'node:path'

dotenv.config();

const app = express();

// Static file
app.use(express.static('public'))

// Serve production build
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static('build'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Connect mongoDB
const URI = process.env.MONGODB_URI
mongoose
    .connect(URI)
    .then(() => { console.log("Connected to the database"); })
    .catch((err) => { console.log(err) });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});

// Routes
app.use('/user', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', paymentRoute)