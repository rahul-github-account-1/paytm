const express=require("express");
const zod=require('zod');
const {Users,Accounts}=require('../db')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config')
const bcrypt = require('bcrypt');
const saltRounds = 10;  // Number of salt rounds, higher is more secure but slower

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}
async function verifyPassword(userPassword, storedHash) {
    try {
      return await bcrypt.compare(userPassword, storedHash);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }
  
  
const signupBody=zod.object({
    username: zod.string().email().min(3).max(30),
    password:zod.string().min(6),
    firstName:zod.string().trim().max(50),
    lastName: zod.string().trim().max(50)
})
const updateBody=zod.object({
    password:zod.string().min(6).optional(),
    firstName:zod.string().trim().max(50).optional(),
    lastName: zod.string().trim().max(50).optional()    
})
const signinBody= zod.object({
    username: zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})
async function signup(req,res){
    console.log("working ")
        const {success,data}= signupBody.safeParse(req.body);
        if(!success){
              return  res.status(411).json({
                        "message":"Invalid Inputs"
                    })
        }    
        const existingUser= await Users.findOne({username:data.username});
        if(existingUser){
            return res.status(411).json({
                "message":"Users already exists"
            })
        }

        var hashedPassword = await hashPassword(data.password);
        data.password = hashedPassword;
        const userCreated =await Users.create(data);
    try{
        await Accounts.create({
            user:userCreated._id,
            balance:Math.random()*10000+1
        })
        return  res.status(201).json({
            message: "Users Created",
        })

    }
    catch(err){
        console.log("error occured "+ err);
    }
        
}

async function signin(req,res){
        const {success,data}=signinBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message:"Invalid input"
            })
        }
        const existingUser=await Users.findOne({username:data.username})
        console.log(existingUser)
        if(!existingUser){
            return res.status(411).json({
                message:"Users doesn't exists"
            })
        }
        if(await verifyPassword(data.password,existingUser.password)){
            const user_id=existingUser._id;
            const token=jwt.sign({
                user_id
            },JWT_SECRET);
            console.log("token "+ token)
    
            return  res.status(200).json({
                message: "Signin Success",
                token: token
            })
        }
        else{
            return res.status(400).json({
                message:"Incorrect Credentials"
            })
        }
        
}

async function updateUser(req,res){
    const {success,data}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Invalid input"
        })
    }

    if(!data.hasOwnProperty("password")){
           await Users.updateOne({_id:req.user_id},data);
    }
    else{
        var hashedPassword = await hashPassword(data.password);
        data.password = hashedPassword;
        await Users.updateOne({_id:req.user_id},data);
    }
    return res.status(201).json({
        message:"user update successfully"
    })
}

async function getUser(req,res){
        const filter=req.query.parameter||"";
        const users=   await Users.find({
            $or:[
                {firstName:{$regex:filter, $options:'i'}},
                {lastName:{$regex:filter,$options:'i'}}

            ]
        })
        return res.status(200).json({
            users:users.map((user)=>{
                return {
                    username:user.username,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    _id:user._id
                }
            })
        })
}

module.exports={
    signup,
    signin,
    updateUser,
    getUser
}