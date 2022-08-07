const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth : {
        user: 'webdevskp@gmail.com',
        pass: 'papo2123',
    },
    secure: true,
});

const mailData = (recMail, otp) => {
    return {
        from: 'webdevskp@gmail.com',
        to: recMail,
        subject : 'OTP to change your password.',
        text : 'Hello,\n\tKindly use the OTP ' + otp + ' to change your password.',
    }
}

const sendEMail = (recMail, otp) => {
    transporter.sendMail(mailData(recMail, otp), (err, info) => {
        if(err){
            console.log("Error : ", err);
        }
        // else is not defined to avoid logs  
    });
    return true;
}

module.exports = sendEMail;