const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50

    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
        email: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
        password: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model("User", userSchema);


exports.User = User;
