require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static(path.join(__dirname, "plublic")))
app.use(cookieParser())

const userRoutes = require("./routes/userRoute")
const postRoutes = require("./routes/postRoute")

const { dbConnection } = require("./db/dbConnection")
dbConnection()

app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT, function (err) {
    console.log("port connected successfuly");
})