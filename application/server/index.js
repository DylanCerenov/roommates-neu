/**
 * Roommate Search Engine Project
 */

const PORT = 3001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require('./models/Users.js');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://dylan:MernStack1@cluster0.izgdqm5.mongodb.net/merntutorial?retryWrites=true&w=majority"
);

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body; 
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user); 
})

app.listen(PORT, () => {
    console.log(`Local server is listening on port ${PORT}`);
});