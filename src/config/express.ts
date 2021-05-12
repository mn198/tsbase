import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import config from './config';
import { RoutesConfig } from '../routes';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('./passport');

const app = express();

/** authenticate */
app.use(passport.initialize());
app.use(passport.session());

/** logging */
app.use(morgan('dev'));

/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    // logging.info(`Medthod: [${req.method}] - Url: [${req.url}] - Status: [${req.statusCode}] - IP: [${req.socket.remoteAddress}]`, namespace);
    next();
});

/** Parse body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of api */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
app.use(config.server.api_version, RoutesConfig);

/** swagger ui */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    res.status(404).json({
        message: error.message
    });
});

export default app;