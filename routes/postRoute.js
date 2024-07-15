const express = require("express")
const route = express()

route.get('/', function (req, res) {
    res.send("this is from post route")
})

module.exports = route