import { google } from 'googleapis';
import 'dotenv/config';
import readline from 'readline';
import {logger} from "./logger.ts";

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://mail.google.com/'],
});
console.log('\nAuthorize this app by visiting this url:\n', authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('\nEnter the code from the page here: ', async (code) => {
    try {
        const { tokens } = await oAuth2Client.getToken(decodeURIComponent(code.trim()));
        oAuth2Client.setCredentials(tokens);
        logger.info('Tokens received: ', tokens);
    } catch (error) {
        logger.error('Error retrieving access token:', error);
    } finally {
        rl.close();
    }
});