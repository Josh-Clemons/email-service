import { Client } from 'pg';

export function getSqlClient() : Client {
    return new Client({
        host: 'localhost',
        port: 5432,
        database: 'email_service',
        user: 'postgres',
        password: 'password'
    })
}

export async function startConnection(sqlClient: Client): Promise<void> {
    try {
        await sqlClient.connect();
        console.log("Connected to the database: ", sqlClient.database);
    } catch (e) {
        console.error("Error connecting to the database: ", e);
    }
}

export async function endConnection(sqlClient: Client): Promise<void> {
    try {
        await sqlClient.end();
        console.log("Disconnected from the database");
    } catch (e) {
        console.error("Error disconnecting from the database: ", e);
    }
}