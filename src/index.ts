import {endConnection, getSqlClient, startConnection} from "./client/sqlClient.ts";
import {sendNewEmails} from "./service/emailService.ts";


async function main(): Promise<void> {
    console.log("Starting email service");
    const sqlClient = getSqlClient();

    try {
        await startConnection(sqlClient);
        await sendNewEmails(sqlClient);

    } catch(e) {
        console.error("Error in main: ", e);
    } finally {
        await endConnection(sqlClient);
    }
}

main().then(() => {
    console.log("Until next time chicken f*cker!");
}).catch((e) => {
    console.error(e);
});