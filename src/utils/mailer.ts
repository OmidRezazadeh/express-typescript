const nodemailer=require('nodemailer');
const smtpTransport= require('nodemailer-smtp-transport');
const transportData= smtpTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c26591442df084",
          pass: "a7c0027fee8395"
        },
        tls:{
            rejectUnauthorized:false
        }
})

 export const sendEmail=(email:string,code:string, message:string)=>{
    const transporter = nodemailer.createTransport(transportData);
    transporter.sendMail({
        from:"omid@gmail.com",
        to:email,
        subject:subject,
        html:`<h1>
        سلام ${fullname}
        </h1>
        <p>${message}</p>`

    })
 }