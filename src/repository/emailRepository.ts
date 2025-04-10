import {Email} from "../types/email.ts";
import {Client} from "pg";

export async function getUnsentEmails(client: Client): Promise<Email[]> {
    const result = await client.query('SELECT * FROM email WHERE sent = false');
    return result.rows;
}

export async function updateEmailSentStatus(client: Client, emailId: number): Promise<void> {
    const query = 'UPDATE email SET sent = true, sent_at = NOW(), updated_at = NOW() WHERE id = $1';
    await client.query(query, [emailId]);
}