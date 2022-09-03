import 'module-alias/register';
import 'reflect-metadata';
import cors from 'cors';

import express from 'express';
import bodyParser from 'body-parser';
import { routerV1 } from './api/router/v1';
import logger from './config/logger';
import config from './config';
import appDataSource from './db';
import redisClient from './db/redis';
import { errorHandler } from './errors';
import helmet from 'helmet';
import morgan from 'morgan';

const HOST = config.HOST || '127.0.0.1';
const PORT = Number(config.PORT || 8080);

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.set('name', config.APP_NAME);
app.set('version', config.APP_VERSION);
app.set('port', config.APP_PORT);
app.set('env', config.APP_ENV);
app.set('host', config.APP_HOST);

routerV1(app);
app.use(errorHandler);
app.use(helmet());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const main = async () => {
  appDataSource
    .initialize()
    .then(() => {
      logger.info('-----------------Database connected-----------------');
    })
    .catch((err) => {
      logger.error(err);
    });

  redisClient
    .connect()
    .then(() => logger.info('-------------Redis connected-----------'))
    .catch((err) => logger.error(err));

  app.listen(PORT, HOST, () => {
    logger.info(`
    #################################################################
      - Name: ${app.get('name')}
      - Version: ${app.get('version')}
      - Environment: ${app.get('env')}
      - Host: ${app.get('host')}:${app.get('port')}
      - Database (Postgresql): toptop
    #################################################################
          `);
  });
};

main();
