import pg from 'pg';
import {logger} from "../service/logger.ts";
const { Client } = pg;

export function getSqlClient() : pg.Client {
    return new Client({
        host: 'localhost',
        port: 5432,
        database: 'email_service',
        user: 'postgres',
        password: 'password'
    })
}

export async function startConnection(sqlClient: pg.Client): Promise<void> {
    try {
        await sqlClient.connect();
        logger.info("Connected to the database %s", sqlClient.database);
    } catch (e) {
        logger.error("Error connecting to the database: ", e);
    }
}

export async function endConnection(sqlClient: pg.Client): Promise<void> {
    try {
        await sqlClient.end();
        logger.info("Disconnected from the database");
    } catch (e) {
        logger.error("Error disconnecting from the database: ", e);
    }
}