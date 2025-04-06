/*
Fields the table should have:
- id (primary key)
- to (text)
- subject (text)
- body (text)
- sent (boolean)
- sent_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)

methods need:
- get emails
- save email
 */

import {Email} from "../types/email.ts";
import {Client} from "pg";

export async function getEmails(client: Client): Promise<Email[]> {
    const result = await client.query('SELECT * FROM email');
    return result.rows;
}