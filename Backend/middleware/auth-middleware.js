//auth-middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async(req, res, next)=>{
    try {
        const token = req.cookies.token;// Get token from cookie
        if(!token){
            return res.status(401).json({msg: "Unauthorized"});
        }

        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // const userData = await User.findById( isVerified.userId);

        if(!isVerified){
            return res.status(404).json({msg:"token not verify"})
        }
        console.log(isVerified);

        // req.user = userData;
        // req.token = token;
        req.userId = isVerified.userId;

        next();
    } catch (error) {
        console.error("Auth middleware error:",error)
        return res.status(401).json({message: "Unauthorized , Invalid token."});
    }
}

module.exports = authMiddleware;