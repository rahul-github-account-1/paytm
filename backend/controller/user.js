const express=require("express");
const zod=require('zod');
const Users=require('../db')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config')
const signupBody=zod.object({
    username: zod.string().email().min(3).max(30),
    password:zod.string().min(6),
    firstName:zod.string().trim().max(50),
    lastName: zod.string().trim().max(50)
})

const signinBody= zod.object({
    username: zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})
async function signup(req,res){
        const {success,data}= signupBody.safeParse(req.body);
        if(!success){
              return  res.status(411).json({
                        "message":"Invalid Inputs"
                    })
        }    
        const existingUser= await Users.findOne({username:data.username});
        if(!existingUser){
            return res.status(411).json({
                "message":"User already exists"
            })
        }

        const user=new Users(data)
        var hashedPassword = await user.createHash(data.password);
        user.password_hash = hashedPassword;
        await user.save();
        // const user_id=user._id;
        // const token=jwt.sign({
        //     user_id
        // },JWT_SECRET);

        return  res.status(201).json({
            message: "User Created",
        })
        
}

async function signin(req,res){
        const {success,data}=signinBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message:"Invalid input"
            })
        }
        const existingUser=await Users.findOne({username:data.username})
        if(!existingUser){
            return res.status(411).json({
                message:"User doesn't exists"
            })
        }
        if(await existingUser.validatePassword(data.password)){
            const user_id=existingUser._id;
            const token=jwt.sign({
                user_id
            },JWT_SECRET);
    
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


module.exports={
    signup,
    signin
}