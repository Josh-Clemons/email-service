import {createLogger, format, transports} from 'winston';

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.splat(),
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/email-service-info.log'})
    ]
});