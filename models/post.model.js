const mongoose = require("mongoose")
const userPost = new mongoose.Schema({
    text : {
        type : String
    }
}, {timestamps : true})

module.exports = mongoose.model("Posts", userPost)