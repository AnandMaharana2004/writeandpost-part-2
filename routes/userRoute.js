const express = require("express")
const route = express()
const userModel = require("../models/user.model")
const { hashPassword, cheakPassword } = require("../controllers/authentication")
const { setToken, removeToken } = require("../utils/setToken")
const cheakLogedin = require("../middlewares/cheakLoged")
const { cheakinputfildsForRegister, cheakinputfildsForLogin } = require("../utils/cheakInputFilds")

route.get('/', function (req, res) {
    res.send("this is from user route")
})

route.post('/register', async function (req, res) {
    try {

        let { email, password, age, username } = req.body
        let allfill =  cheakinputfildsForRegister(email, password, username, age)
        if (!allfill) return res.status(200).send("please correctly fill the form")
        let usreExist = await userModel.findOne({ email })
        if (usreExist) return res.status(300).send("the user already exist so please login")
        let hashedPassword = await hashPassword(password)
        let user = await userModel.create({
            email,
            password: hashedPassword,
            age,
            username
        })
        user.save()
        let token = setToken(user)
        if (token) {
            res.cookie("token", token)
            res.status(303).send("the token setup successfuly" + user)

        } else {
            res.status(300).send("the token not get")
        }

    } catch (error) {
        res.status(200).send("user creation unsuccessfuly !!!", error)
    }

})

route.get('/logout', function (req, res) {
    try {
        let token = removeToken()
        res.cookie("token", token)
        res.status(202).send("token remove succesfuly !!")
    } catch (error) {
        res.status(200).send("token not remove yet")
    }
})

route.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body
        let allfil = cheakinputfildsForLogin(email, password)
        if(!allfil) return res.status(200).send("please fill the all feald")
        let user = await userModel.findOne({ email })
        if (!user) return res.status(200).send("the user or password incorrect !!!")
        let isMath = await cheakPassword(password, user.password)
        if (!isMath) return res.status(200).send("the user or password is incroorect !!")
        let token = setToken(user)
        if (!token) return res.status(300).send("the token setup fail")
        res.cookie("token", token)
        res.status(303).send("cookie setup and login successfuly" + user)
    } catch (error) {
        res.status(300).send("the user login fail", error)
    }

})

route.get('/profile', cheakLogedin, async function (req, res) {
    //    let user = req.user.email
    let user = await userModel.findOne({ email: req.user.email })
    res.send(user)
})

module.exports = route

