const mongoose = require("mongoose");
const usermodel = require("../model/authModel");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Hackathon2024-NullPointers"

const signup= async (req,res)=>{
    const {name,email,password,role}= req.body;

    if(!name || !role || !email || !password){
        res.status(201).json({error :  "Please enter all the fields"});
    }

    try{
        const existinguser = await usermodel.findOne({email:email});
        
        if(existinguser){
            return res.status(400).json({
                error:"User already exists with this username or email"
            });
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const result =  await  usermodel.create({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        })

        const token = jwt.sign({email :result.email , id : result._id},SECRET_KEY )//{expiresIn : '1h'}

        res.status(201).json({USER:result,token : token ,  message:"Registered Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(422).json({error:"something went wrong"})
    }
}

const signin= async (req,res)=>{
    const {email,password}= req.body;

    if(!email || !password){
        res.status(422).json({error :  "Please enter email and Password"});
    }

    try{
        const existinguser = await usermodel.findOne({email:email});
        
        if(!existinguser){
            return res.status(404).json({
                error:"Invaild email"
            });
        }

        const existingpassword = await bcrypt.compare(password , existinguser.password);

        if(!existingpassword){
            return res.status(404).json({error:"Invalid Credentials"});
        }
        const token = jwt.sign({email :existinguser.email , id : existinguser._id},SECRET_KEY )//{expiresIn : '1h'}

        res.status(201).json({user: existinguser, token : token ,message:"Signed in Successfully"});



    }catch(error){
        console.log(error);
        res.status(422).json({error:"something went wrong"});
    }

}

module.exports={signup, signin};