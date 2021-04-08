import { Request, Response } from 'express';
import { Observable } from 'rxjs';

interface IAuthController {
  login(request: Request, response: Response);
}