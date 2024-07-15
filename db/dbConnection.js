const mongoose = require('mongoose');

const uri = process.env.MONGO_URI; // Localhost connection string with database name

function dbConnection(){
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB ');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
module.exports = {dbConnection};
