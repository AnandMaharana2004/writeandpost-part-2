const express = require("express")
const route = express()
require("ejs")
const userModel = require("../models/user.model")
const { hashPassword, cheakPassword } = require("../controllers/authentication")
const { setToken, removeToken} = require("../utils/setToken")
const cheakLogedin = require("../middlewares/cheakLoged")
const { cheakinputfildsForRegister, cheakinputfildsForTwoinput } = require("../utils/cheakInputFilds")
const upload = require("../middlewares/multer") 

route.get('/' ,function (req, res) {
    res.render("index")
})

route.get('/login' ,function (req, res) {
    res.render("login")
})

route.get('/register',function (req, res) {
    res.render("register")
})

route.get('/profile', cheakLogedin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email })
        .populate("posts")
        res.render("profile", {user})
        // res.status(303).send("this is from profile")
    } catch (error) {
        res.status(200).send("the profile page not loaded yet !!!")
    }
})

route.get('/logout',cheakLogedin ,function (req, res) {
    try {
        let token = removeToken()
        res.cookie("token", token)
        // res.status(202).send("token remove succesfuly !!")
        res.redirect("/")
    } catch (error) {
        res.status(200).send("token not remove yet")
    }
})

route.get('/uploadProfilepic', cheakLogedin, async function(req, res){
    res.render("uploadProfilepic")
})

route.post('/register', async function (req, res) {
    try {

        let { email, password, age, username } = req.body
        let allfill = cheakinputfildsForRegister(email, password, username, age)
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
            // res.status(303).send("the token setup successfuly" + user)
            console.log(user.profilePic);
            res.redirect("profile")

        } else {
            res.status(300).send("the token not get")
        }

    } catch (error) {
        res.status(200).send("user creation unsuccessfuly !!!", error)
    }

})

route.post('/login', async function (req, res) {
    try {
        let { email, password } = req.body
        let allfill = cheakinputfildsForTwoinput(email, password)
        if (!allfill) return res.status(300).send("please fill all the fild")
        let user = await userModel.findOne({ email })
        if (!user) return res.status(300).send("the user is not exist")
        let passwordMach = await cheakPassword(password, user.password)
        if (!passwordMach) return res.status(300).send("the password is incorrect")
        let token = setToken(user)
        res.cookie("token", token)
        // res.status(302).send("the user login successfuly")
        res.redirect("profile")

    } catch (error) {
        res.send("the user login fail", error)
    }
})

route.post('/uploadProfilepic', cheakLogedin, upload.single("prifile-pic") ,async function(req, res){
    let user =  await userModel.findOne({email : req.user.email})
    if(!req.file) return res.status(500).send("please select the file path")
    user.profilePic = req.file.filename
    await user.save()
    // res.send(user.profilePic)
    res.redirect("profile")
})

module.exports = route