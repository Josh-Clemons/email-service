import {endConnection, getSqlClient, startConnection} from "./client/sqlClient.ts";
import {getEmails} from "./repository/emailRepository.ts";
import {sendEmails} from "./service/emailService.ts";


async function main(): Promise<void> {
    const sqlClient = getSqlClient();

    try {
        await startConnection(sqlClient);
        const emails = await getEmails(sqlClient);
        console.log(emails);
        await sendEmails(emails);

    } catch(e) {
        console.error("Error in main: ", e);
    } finally {
        await endConnection(sqlClient);
    }
}

main().then(() => {
    console.log("done");
}).catch((e) => {
    console.error(e);
});