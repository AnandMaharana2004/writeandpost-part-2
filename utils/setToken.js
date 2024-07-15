const jwt = require("jsonwebtoken")
const setToken = (user) => {
    try {
        let token = jwt.sign({email : user.email, userId : user._id},process.env.JWT_SECRET)
        return token
        
    } catch (error) {
        console.log("jwt setup fail");
    }
    
}

module.exports = {setToken}