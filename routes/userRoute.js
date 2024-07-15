const express = require("express")
const route = express()
const userModel = require("../models/user.model")
const { hashPassword } = require("../controllers/authentication")
const { setToken } = require("../utils/setToken")

route.get('/', function (req, res) {
    res.send("this is from user route")
})

route.post('/register', async function(req, res){
    try {

        let {email, password , age, username} = req.body
        let hashedPassword = await hashPassword(password)
        let user = await userModel.create({
        email,
        password:hashedPassword,
        age,
        username
    })
    user.save()
    let token =  setToken(user)
    if(token){
        res.cookie("token",token)
        res.status(303).send("the token get successfuly")

    } else{
        res.status(300).send("the token not get")
    }
    
    } catch (error) {
        res.status(200).send("user creation unsuccessfuly !!!", error)
    }
    
})

module.exports = route