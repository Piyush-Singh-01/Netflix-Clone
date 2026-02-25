//auth-router.js
const express = require("express");
const {register,login, logOut, user} = require('../controllers/auth-controller');
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
// router.get("/user", authMiddleware, user);

module.exports = router