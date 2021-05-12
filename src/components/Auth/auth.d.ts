import { Request, Response } from 'express';
import { Observable } from 'rxjs';

interface IAuthController {
  login(request: Request, response: Response);
  oauth_login(request: any, response: Response);
}