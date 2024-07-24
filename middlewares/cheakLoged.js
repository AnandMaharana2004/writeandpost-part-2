const jwt = require("jsonwebtoken")
module.exports = cheakLogedin = (req, res, next) => {
    try {
        let token = req.cookies.token
        if(token == "") return res.send("you are not the valid user or this user have no token")
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.user = data
        // res.status(202).send("the data setup")
        next()
    } catch (error) {
        res.status(300).send("use not veryfied yet or token not avalable", error)

    }
}