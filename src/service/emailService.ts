import {getSqlClient, startConnection} from '../client/sqlClient.ts';
import {Email} from "../types/email.ts";
import {getEmails} from "../repository/emailRepository.ts";
import transporter from "../client/emailClient.ts";
import {SendMailOptions} from "nodemailer";

export async function fetchEmails(): Promise<Email[]> { // probably don't need to export this
    const sqlClient = getSqlClient();
    await startConnection(sqlClient);

    return await getEmails(sqlClient);
}

export async function sendEmails(emails: Email[]): Promise<boolean> {
    for (const email of emails) {
        const mailOptions: SendMailOptions = {
            from: 'mrjoshc@gmail.com',
            to: email.email_to,
            subject: email.subject,
            text: email.body,
            html: '<p>Hello, this is a <b>test</b> email html.</p>',
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: ", info);
        } catch (err) {
            console.error("Error sending email: ", err);
            return false;
        }
    }

    return true;
}
