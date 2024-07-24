// // middleware/upload.js
// const multer = require('multer');
// const path = require('path');

// // Set up disk storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../public/images'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require("multer")
const crypto = require("crypto")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      const fn = name.toString("hex") + path.extname(file.originalname)
      cb(null, fn)
    })
  }
})

const upload = multer({ storage: storage })

module.exports = upload