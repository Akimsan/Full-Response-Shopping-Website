const nodemailer = require('nodemailer');
// we are using mailtrap website for this access
// and we are using nodemailer package 

const sendEmail = async Options =>{
    const transport = {
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    };// those are basic requirements to send the email

    const transporter = nodemailer.createTransport(transport); //transporter to send the mail
    

    const Message = {
        from:`${process.env.SMTP_FROM_NAME} <>${process.env.SMTP_FROM_EMAI}`,
        to:Options.email,
        subject:Options.subject,
        text:Options.message
    }

    await transporter.sendMail(Message)
}
module.exports = sendEmail;