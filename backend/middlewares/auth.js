const {JWT_SECRET}=require('../config');
const jwt=require("jsonwebtoken");
const {Users}=require('../db')
const authMiddleware= (req,res,next)=>{
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(403).json({
                message:"Bad request as token not found"
            })
        }
        const token= authHeader.split(' ')[1];
        try{
            const decoded=jwt.verify(token,JWT_SECRET);
            const user=Users.findOne({_id:decoded.user_id});
            if(!user){
                return res.status(411).json({
                    message:"user is not in db"
                })
            }
            req.user_id=decoded.user_id;
            next();
        }
        catch(err){
                return res.status(400).json({
                    "message":"Cannot verify the user using token "
                })
        } 
}

module.exports={authMiddleware};