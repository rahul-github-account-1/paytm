const mongoose =require("mongoose");
const bcrypt=require('bcrypt')
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

// Method to generate a hash from plain text
UserSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  
  };
  

UserSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
  };
  

const User=mongoose.model('Users',userSchema);

module.exports={User}