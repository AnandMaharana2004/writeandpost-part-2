// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// function hashPassword (password){
//     bcrypt.hash(password, saltRounds, function(err, hash) {
//         return hash
//     });
// }

// module.exports = {hashPassword}

const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

module.exports = { hashPassword };
