import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '1337';
const MONGOOSE_URI = "mongodb://localhost:27017/minishop";
const API_VERSION = "/api/v1";

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    mongoose_uri: MONGOOSE_URI,
    api_version: API_VERSION
};

const JWT = {
    secret: 'a string that represents secret',
    exp: 2 // hours
}

const config = {
    server: SERVER,
    jwt: JWT
};

export default config;
