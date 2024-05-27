const mongoose =require("mongoose");
const userSchema= new mongoose.Schema({
        username:{
            type:String,
            required: true,
            unique:true,
            trim:true,
            lowercase:true,
            minLength:3,
            maxLength:30
        },
        password:{
            type:String,
            required:true,
            nimLength:6
        },
        firstName:{
            type: String,
            required:true,
            trim:true,
            maxLength:50
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
            maxLength:50
        }
})
const accountSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const Users=mongoose.model('Users',userSchema);
const Accounts=mongoose.model('Accounts',accountSchema)
module.exports={Users,Accounts}