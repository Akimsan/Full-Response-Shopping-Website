class ErrorHandler extends Error {
    constructor(message,statusCode){
       super(message,statusCode)
       this.statusCode = statusCode;
       Error.captureStackTrace(this,this.constructor)    // it gives stack property that give what type of error and where that errors occur 
       
    }
}
module.exports=ErrorHandler;