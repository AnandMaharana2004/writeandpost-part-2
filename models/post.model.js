const mongoose = require("mongoose")
const userPost = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    heading: {
        type: String,
        require: true
    },
    file: {
        type: String,
        require: true
    },
    text: {
        type: String
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Post", userPost)