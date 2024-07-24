const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    profilePic: {
        type: String,
        default : ""
    },

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)