import {Email} from "../types/email.ts";
import transporter from "../client/emailClient.ts";
import {SendMailOptions} from "nodemailer";
import {getUnsentEmails, updateEmailSentStatus} from "../repository/emailRepository.ts";
import {Client} from "pg";


async function getNewEmails(sqlClient: Client): Promise<Email[]> {
   return await getUnsentEmails(sqlClient);
}

export async function sendNewEmails(sqlClient: Client): Promise<boolean> {
    const emails: Email[] = await getNewEmails(sqlClient);

    if(emails.length === 0) {
        console.log("No new emails to send");
        return true;
    }

    for (const email of emails) {
        const mailOptions: SendMailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email.email_to,
            subject: email.subject,
            html: email.body,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: ", info);
            try {
                await updateEmailSentStatus(sqlClient, email.id);
            } catch (err) {
                console.error("Error updating email status: ", err);
                return false;
            }
        } catch (err) {
            console.error("Error sending email: ", err);
            return false;
        }
    }

    return true;
}
