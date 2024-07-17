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


function cheakPassword(password, hashedPassword){
    return new Promise((resolve, reject)=> {
        bcrypt.compare(password, hashedPassword,function(err,result){
            if(err){
                reject(err)
            } else{
                resolve(result)
            }
        })
    })
}
module.exports = { hashPassword , cheakPassword};
