
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto');

//{{base_url}}/api/v1/register
exports.regiterUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password,avatar} = req.body
   const user = await User.create({
        name,
        email,
        password,
        avatar
    });


     sendToken(user,201,res);
})


//{{base_url}}/api/v1/login
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body

    if(!password||!email){
        return next(new ErrorHandler('Please Enter email and password',400))
    }

    //find the user 
    const user = await User.findOne({email}).select('+password'); // normaly we can not get password becase in user model ///  select: false

    if(!user){
         return next(new ErrorHandler('Ivalid Email or  Password',401));
    }

    if(! await user.isValidPassword(password)){
         return next(new ErrorHandler('Ivalid Email or  Password',401));
    }

    sendToken(user,201,res);

})


//{{base_url}}/api/v1/logout
exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httponly:true
    }).status(200)
    .json({
        success:true,
        message:"Loggedout"
    })
}


//{{base_url}}/api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
   const user = await User.findOne({email:req.body.email});

   if(!user){
    return next(new ErrorHandler('User not found with this email',404))
   }

   const resetToken =  await user.getResetToken();
   user.save({validateBeforeSave:false})
    
   console.log(resetToken);
   
   //Create reset url
   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

   const message = `Your Password reset url is as follows\n\n ${resetUrl}\n\n If you have not requested this email then ignore it.`
   
   // send email
   try {

       sendEmail({
            email:user.email,
            subject:"Acart Password Recovery",
            message:message
       })

       res.status(200).json({
            success:true,
            message:`Email sent to  ${user.email}`
       })

   } catch (error) {
       user.resetPasswordToken = undefined;
       user.resetPasswordTokenExpire= undefined;
       await user.save({validateBeforeSave:false});
       return next(new ErrorHandler(err.message),500);
   }
})




//{{base_url}}/api/v1/password/reset/token
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
 const resetPasswordToken = crypto.createHash('sha256').update(req.params.token ).digest('hex') 

 const user= await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire:{
           $gt:Date.now()
       }
     })
 if(!user){
    return next(new ErrorHandler('Password ResetToken is invalid or expire'))
 }
 if(req.body.password !== req.body.confirmPassword){
     return next(new ErrorHandler('Password does not match'))
 }
 
 user.password = req.body.password;
 user.resetPasswordToken=undefined;
 user.resetPasswordTokenExpire=undefined;

 await user.save({validateBeforeSave:false})


 sendToken(user,201,res);

})

//Get User Profile-{{base_url}}/api/v1/myprofile
exports.getUserProfile = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})


//Cahnge Password
exports.changePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');
    
    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)){
       return next(new ErrorHandler('Old Password is incorrect',401))
    }

    // assigning new password
    user.password = req.body.password;
    await user.save();

    res.status(200).json({
        success:true,
    })
})


//UpdateProfile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
   const newUserData = {
    name: req.body.name,
    email: req.body.email
   }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
       new: true, // it have to show the new updated data
       runValidators:true

    })

     res.status(200).json({
        success:true,
        user
    })
})

//Admin:Get all Users - {{base_url}}/api/v1/admin/users
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
     const users =  await User.find()
     res.status(200).json({
        success:true,
        users
     })
})


//Admin-Get Specific User - {{base_url}}/api/v1/admin/user/66c440a2509b430df512be9d
exports.getUser = catchAsyncError(async(req,res,next)=>{
   const user = await User.findById(req.params.id);
   if(!user){
    return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
   }

   res.status(200).json({
        success:true,
        user
   })
});

//Admin:Update User role - {{base_url}}/api/v1/admin/user/66c43c751fd0e82a37744cc6 
exports.updateUser = catchAsyncError(async(req,res,next)=>{
 const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
   }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
       new: true, // it have to show the new updated data
       runValidators:true

    })

     res.status(200).json({
        success:true,
        user
    })
})


//Admin-Delete USer -{{base_url}}/api/v1/admin/user/66c43c751fd0e82a37744cc6
exports.dleteUser = catchAsyncError(async(req,res,next)=>{
    const user =User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    
    await user.deleteOne();

     res.status(200).json({
        success:true
    })
})

