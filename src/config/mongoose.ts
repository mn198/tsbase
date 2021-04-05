import mongoose from 'mongoose';
import config from './config';
import logging from './logging';

const namespace = 'Mongoose config';

// connect to mongo db
const mongoUri = config.server.mongoose_uri;
mongoose
    .connect(mongoUri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        logging.info(namespace, 'connected to database');
    })
    .catch((err) => {
        logging.error(namespace, err);
    });
