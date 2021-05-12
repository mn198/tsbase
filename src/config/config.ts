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

const GOOGLE = {
    cliendID: '136451632744-m3rie89qqhepueu121hftna1ilg3jff3.apps.googleusercontent.com',
    clientSecret: 'PXAJMlm8xjgmt8iNfm6iivVm',
    callbackURL: 'http://localhost:1337/api/v1/auth/google/callback'
}
const FACEBOOK = {
    cliendID: '824142944592985',
    clientSecret: '6d912f0d9e87c844fc3bab7575e238c5',
    callbackURL: 'http://localhost:1337/api/v1/auth/facebook/callback'
}

const JWT = {
    secret: 'a string that represents secret',
    exp: 2 // hours
}

const config = {
    server: SERVER,
    jwt: JWT,
    oauth: {
        google: GOOGLE,
        facebook: FACEBOOK
    }
};

export default config;
