const sendToken = (user,statusCode,res)=>{
   //creating web token 
   const token = user.getJwtToken();
   

   // setting cookies
   const options = {
      expires:new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000),
      httpOnly:true  // this cookies cant be accessed by javaScript 
   }

   res.status(statusCode)
   .cookie('token',token,options)
   .json({
    success:true,
    token,
    user
   })
}

module.exports = sendToken;