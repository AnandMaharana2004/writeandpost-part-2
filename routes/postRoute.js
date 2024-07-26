const express = require("express")
const route = express()
const userModel = require("../models/user.model")
const postModel = require("../models/post.model")
const upload = require("../middlewares/multer")
const cheakLogedin = require("../middlewares/cheakLoged")
const { cheakinputfildsForTwoinput } = require("../utils/cheakInputFilds")
const { shuffleArray } = require("../utils/arraySuffle")
const { isUserInArray } = require("../utils/alreadylike")

route.get('/', function (req, res) {
    res.send("this is from post route")
})

route.get('/upload', cheakLogedin, async function (req, res) {
    await userModel.findOne({ email: req.user.email })
    res.render("postUpload")
})

route.get('/like/:id', cheakLogedin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email })
        let post = await postModel.findOne({ _id: req.params.id })
        let likedUser = isUserInArray(post.like, user._id)
        if (likedUser == true) return res.redirect("/post/allpost")
        post.like.push(user.id)
        await post.save()
        res.redirect("/post/allpost")

    } catch (error) {
        res.status(300).send("the like is not working")
    }
})

route.get('/allpost', cheakLogedin, async function (req, res) {
    let posts = await postModel.find()
    shuffleArray(posts)
    res.render("allpost", { posts })

})

route.get('/profile/:id', cheakLogedin, async function (req, res) {
    const post = await postModel.findOne({ _id: req.params.id })
    // console.log(post.user);
    const postOwner = await userModel.findOne({ _id: post.user })
        .populate("posts")
    // console.log(postOwner);
    res.render("profile-2", { postOwner })
})

route.get('/edit/:id', cheakLogedin, async function (req, res) {
    const post = await postModel.findOne({ _id: req.params.id })
    res.render("postEdit", { post })
})

route.post('/upload', cheakLogedin, upload.single("file"), async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email })
        let { heading, text } = req.body
        let allfill = cheakinputfildsForTwoinput(heading, text)
        if (!allfill) return req.status(300).send("please fill all the fild")
        let file = req.file
        if (!file) return res.status(300).send("pleace select the file path")
        try {
            let post = await postModel.create(
                {
                    user: user._id,
                    heading,
                    text,
                    file: file.filename
                }
            )
            console.log(typeof user.posts);
            user.posts.push(post._id)
            await post.save()
            await user.save()
            // res.status(202).send({ message: "the post created successfully !!!",user, post})
            res.redirect("/user/profile")
        } catch (error) {
            res.status(200).send("the file uuploading fail", error)
        }
    } catch (error) {
        res.status(200).send("the post created unseccessfully !!!!!!!", error)
    }
})

route.post('/edit/:id', cheakLogedin, upload.single("file"), async function (req, res) {
    try {
        let post = await postModel.findOne({ _id: req.params.id })
        let { heading, text } = req.body
        let postFile = req.file
        let fill = cheakinputfildsForTwoinput(heading, text)
        if(!fill) return res.send("please fill all the inputs")
            console.log(postFile);
        if (postFile === ""){
            post.file = post.file    
        }
        console.log(post);
        post.heading = heading
        post.text = text
        post.file = postFile.filename
        await post.save()
        res.redirect("/user/profile")
    } catch (error) {
        res.status(300).send("file edit fail")
    }


})

module.exports = route