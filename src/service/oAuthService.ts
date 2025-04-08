import { google } from 'googleapis';
import 'dotenv/config';
import readline from 'readline';

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
console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('\nEnter the code from the page here: ', async (code) => {
    try {
        const { tokens } = await oAuth2Client.getToken(decodeURIComponent(code.trim()));
        oAuth2Client.setCredentials(tokens);

        console.log('\nTokens received:');
        console.log(JSON.stringify(tokens, null, 2));
    } catch (error) {
        console.error('Error retrieving access token:', error);
    } finally {
        rl.close();
    }
});