//user-controller.js
const User = require("../models/user-model");

const getCurrentUser = async(req, res)=>{
    try {
        const userId = req.userId;
        if(!userId){
            return res.status(400).json({msg: "userId is not found"});
        }

        const userData = await User.findById(userId).select("-password");
        if(!userData){
            return res.status(404).json({msg: "user not found"});
        }
        // console.log(userData);
        return res.status(200).json(userData);
    } catch (error) {
        console.log(`error from the user route ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = getCurrentUser;
