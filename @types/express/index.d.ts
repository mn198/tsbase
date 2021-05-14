declare global {
    namespace Express {
        interface Request {
            jwt: {
                id: string;
                username: string;
                displayName: string;
                picture: string;
                description: string;
                email: string;
                role: string;
                iat: string;
                exp: string;
            };
        }
    }
}
