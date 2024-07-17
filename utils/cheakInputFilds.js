const cheakinputfildsForRegister = (email, password, username, age)=>{
    if(email === "" || password ==="" || username === "" || age ===""){
        return false
    }
    return true
    
}
const cheakinputfildsForLogin = (email, password) => {
    if(email ==="" || password ===""){
        return false
    } else{
        return true
    }
}
module.exports = { cheakinputfildsForRegister , cheakinputfildsForLogin}
