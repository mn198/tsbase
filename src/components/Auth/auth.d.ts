import { Observable } from 'rxjs';

interface IAuth {
  login(username: string, password: string): Observable<any>;
}