import { Observable } from 'rxjs';

interface IAuth {
  identityClient(ipAddress: string): Observable<any>;
}