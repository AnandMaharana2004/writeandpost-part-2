const cheakinputfildsForRegister = (email, password, username, age) => {
    if (email === "" || password === "" || username === "" || age === "") {
        return false
    }
    return true

}
const cheakinputfildsForTwoinput = (input1, input2) => {
    if (input1 === "" || input2 === "") {
        return false
    } else {
        return true
    }
}
module.exports = { cheakinputfildsForRegister, cheakinputfildsForTwoinput }

