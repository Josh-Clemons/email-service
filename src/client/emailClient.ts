import nodemailer from 'nodemailer';
import * as Mail from "nodemailer/lib/mailer";

let transporter: nodemailer.Transporter<Mail.Options> = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export default transporter;