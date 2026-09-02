const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide first name"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "pLease provide lastname"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email must be unique"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [8, "password must be at least 8 in characters"],
        trim: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verification_token: {
        type: String,
    },
    email_verified: {
        type: Boolean,
        default: false
    }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;