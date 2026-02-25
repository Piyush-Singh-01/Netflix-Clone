//auth-controllers.js
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const genToken = require("../utils/token");
const jwt = require("jsonwebtoken");


const register = async(req, res)=>{
   try {
     const {username, email, phone, password} = req.body;
    
    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(400).json({msg: "User already exist"})
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({username, email, phone , password: hash_password});

    const token = await genToken(userCreated._id);
    res.cookie("token", token,{
        secure: true,
        sameSite: "None", // secure is false that's why we use strict 
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    })

    return res.status(201).json({
        message: "User registerd successfully",     
        token,
        user: {
        _id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        phone: userCreated.phone
        },      
    })
    
    } catch (error) {
        res.status(500).send({msg: "SignUp server error"})
        console.log(error);
    } 
   
}

const login = async(req, res)=>{
    try{
    const {email,password} = req.body;

    const userExist = await User.findOne({email});

    if(!userExist){
        return res.status(400).json({msg: "Invalid email or password"});
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if(isMatch){
        const token = await genToken(userExist._id);
        res.cookie("token", token,{
            secure: true,
            sameSite: "None",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })
        return res.status(201).json({
            message: "login successful",     
            token,
            user: {
            _id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            phone: userExist.phone
        },      
      })
    }
    else{
        return res.status(401).json({msg: "Invalid email or password"})
       }
    }catch(error){
         res.status(500).send("login server error");
         console.log(error);
    }      
}

const logOut = async(req, res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({msg: "Logout Successful"})
    } catch (error) {
        return res.status(500).json("Logout error");
    }
}

module.exports = {register, login, logOut};
