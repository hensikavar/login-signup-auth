const express = require("express");
const userrouter = express.Router();
const {signup,signin} = require("../controllers/authController");
const {checkUser} = require("../middlewares/authMiddleware");

userrouter.get("/",(req,res)=>{
    res.send({
        "message":"Hello"
    });
});
userrouter.post("/",checkUser);

userrouter.post("/signup",signup);

userrouter.post("/signin",signin);

module.exports = userrouter;