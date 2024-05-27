// const express=require('express')
const {Users,Accounts}=require('../db.js');
const { getRounds } = require('bcrypt');
const { default: mongoose } = require('mongoose');


async  function getBalance(req,res){
        const acc= await Accounts.findOne({user:req.user_id});
        return   res.status(200).json({
            balance: acc.balance
        })
}


async function transferBalance(req,res){
    const session=mongoose.startSession();
    (await session).startTransaction();
    const  {amount,to}=req.body;
    const account=await Accounts.findOne({user:req.user_id}).session(session);
    if(!account||account.balance<amount){
        (await session).abortTransaction();
        return res.status(401).json({
            message: "Insufficient Balance"
        })
    }
    const toAccount= await Accounts.findOne({user:to}).session(session);
    if(!toAccount){
        (await session).abortTransaction();
        return res.status(400).json({
            message:"invalid account"
        })
    }
    await Accounts.updateOne({user:account.user},{$inc:{balance:-amount}}).session(session);
    await Accounts.updateOne({user:toAccount.user},{$inc:{balance:amount}}).session(session);
    (await session).commitTransaction();
    res.status(200).json({
        message:"Transfer Success"
    })
}

module.exports={
    getBalance,
    transferBalance
}