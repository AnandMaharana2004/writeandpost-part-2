const jwt = require("jsonwebtoken")
module.exports = cheakLogedin = (req, res, next) => {
    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.user = data
        // res.status(202).send("the data setup")
        next()
    } catch (error) {
        next()
        res.status(500).send("not veryfied yet", error)

    }
}