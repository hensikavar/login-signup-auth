const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user1','user2'],
        required: true
    }
},{timestamps:true});

module.exports=mongoose.model("user", userSchema);