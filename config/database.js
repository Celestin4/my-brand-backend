const mongoose = require("mongoose");

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to MongoDB")
    } catch (error) {
        console.log('Error occured: ', error.message)
        process.exit(1)
    }
}

    module.exports = connectDB;