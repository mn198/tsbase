import app from './config/express';
import http from 'http';
import config from './config/config';
import logging from './config/logging';

const namespace = 'Server';

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
    logging.info(namespace, `Server is running ${config.server.hostname}:${config.server.port}`);
});