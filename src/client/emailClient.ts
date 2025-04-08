import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as Mail from 'nodemailer/lib/mailer';
import 'dotenv/config';

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
);

oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const accessTokenObject = await oAuth2Client.getAccessToken();

const transporter: nodemailer.Transporter<Mail.Options> = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessTokenObject?.token ?? undefined,
    },
});

export default transporter;