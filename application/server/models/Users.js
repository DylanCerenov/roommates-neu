const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    frequentStudier: {
        type: Boolean,
        required: true,
    },
    extroverted: {
        type: Boolean,
        required: true,
    },
    neat: {
        type: Boolean,
        required: true,
    },
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
