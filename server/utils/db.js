const mongoose = require("mongoose");


const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection with databse is successful");
    } catch (error) {
        console.log("error in connection with database", error);
        process.exit(0);
    }
}

module.exports = connectDb;