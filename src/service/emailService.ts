import {getSqlClient, startConnection} from '../client/sqlClient.ts';
import {Email} from "../types/email.ts";
import {getEmails} from "../repository/emailRepository.ts";

export async function fetchEmails(): Promise<Email[]> { // probably don't need to export this
    const sqlClient = getSqlClient();
    await startConnection(sqlClient);

    return await getEmails(sqlClient);
}
