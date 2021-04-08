import { NextFunction, Request, Response } from "express";

export interface IMiddleware {
    isPasswordAndUserMatch(request: Request, response: Response, next: NextFunction);
    validateJsonWebToken(request: Request, response: Response, next: NextFunction);
    validateUserPayload(request: Request, response: Response, next: NextFunction);
}