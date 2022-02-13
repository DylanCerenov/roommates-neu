const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import roommates from './api/roommates.route.js';
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/roommates", roommates);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

const port = process.env.PORT || 3001;

export default app;