const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`listening on port + ${port}`);
})