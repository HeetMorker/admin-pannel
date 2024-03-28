const mongoose = require('mongoose');
const { mongoURL } = require('./config');

const connectDb = async () => {
    try {
        const url = mongoURL;
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = connectDb;