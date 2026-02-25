const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connection successful to DB");
    }catch(error){
        console.log("Database Connection Failed");
        process.exit(1);
    }

}

module.exports = connectDB;