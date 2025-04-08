import {endConnection, getSqlClient, startConnection} from "./client/sqlClient.ts";
import {sendNewEmails} from "./service/emailService.ts";
import {logger} from "./service/logger.ts";


async function main(): Promise<void> {
    logger.info("Starting email service");
    const sqlClient = getSqlClient();

    try {
        await startConnection(sqlClient);
        await sendNewEmails(sqlClient);

    } catch(e) {
        logger.error("Error in main: ", e);
    } finally {
        await endConnection(sqlClient);
    }
}

main().then(() => {
    logger.info("Until next time chicken f*cker!");
}).catch((e) => {
    logger.error("Error in main: ", e);
});