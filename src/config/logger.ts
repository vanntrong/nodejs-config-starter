import config, { isProdEnv } from '@/config';
import { createLogger, format, transports } from 'winston';

const colors: { [key: string]: string } = {
  error: 'red',
  warn: 'orange',
  data: 'grey',
  info: 'green',
  debug: 'yellow',
  verbose: 'cyan',
  silly: 'magenta',
  custom: 'blue',
};

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${level}: ${colors[level] || ''} ${label} || ${timestamp} || ${message}\x1b[0m `;
});

const logger = createLogger({
  level: isProdEnv ? 'error' : 'debug',
  format: config.LOG_FORMAT === 'simple' ? myFormat : format.json(),
});

if (config.NODE_ENV === 'development') {
  logger.add(new transports.Console({ format: myFormat }));
} else {
  logger.defaultMeta = { service: config.SERVICE_NAME };
  logger.add(new transports.File({ filename: 'error.log', level: 'error' }));
  logger.add(new transports.File({ filename: 'combined.log' }));
}
export default logger;
