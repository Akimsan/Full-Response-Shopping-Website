const mongoose = require('mongoose');
const validator = require('validator');// for email validation
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address'] // we can get this through package - validator
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [6, 'Password cannot exceed 6 characters'],
        select: false
    },
    avatar: {
        type: String
    },
    role :{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})
userSchema.pre('save',async function(next){
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    // Check if password is defined
    if (this.password) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            return next(error);
        }
    }
    next();
})
//GENERATE JSON WEB TOKEN
userSchema.methods.getJwtToken = function(){
    return  jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
//validating password
userSchema.methods.isValidPassword = async function(enteredPassword){
    return  await bcrypt.compare(enteredPassword, this.password)
}



//Reset password
userSchema.methods.getResetToken = async function(){
    //Generate token to using crypto package
   const token = crypto.randomBytes(20).toString('hex'); //buffer date convert as string
   
   //Generate Hash and set to resetPasswordToken
   this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex'); // 'sha256' it is aalgorthm

   //Set token expires time 
   this.resetPasswordTokenExpire = Date.now() + 30*60*1000;

   return token
}


let model = mongoose.model('User',userSchema);
module.exports = model;