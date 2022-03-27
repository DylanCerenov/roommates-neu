import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import roommates from './api/roommates.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/roommates", roommates);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app;