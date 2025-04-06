import {endConnection, getSqlClient, startConnection} from "./client/sqlClient.ts";
import {getEmails} from "./repository/emailRepository.ts";


async function main(): Promise<void> {
    const sqlClient = getSqlClient();
    await startConnection(sqlClient);

    const emails = await getEmails(sqlClient);
    console.log(emails);

    await endConnection(sqlClient);
}

main().then(() => {
    console.log("done");
}).catch((e) => {
    console.error(e);
});