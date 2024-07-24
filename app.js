require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
require("ejs")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

const userRoutes = require("./routes/userRoute")
const postRoutes = require("./routes/postRoute")

const { dbConnection } = require("./db/dbConnection")
dbConnection()
app.get('/',function(req, res){
    res.render("index")
})
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT, function (err) {
    console.log("port connected successfuly");
})