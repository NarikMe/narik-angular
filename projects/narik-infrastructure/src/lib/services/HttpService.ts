import { Observable } from 'rxjs';

export abstract class HttpService {
  abstract get(url: string): Observable<Object>;
  abstract post(url: string, data: any): Observable<Object>;
  abstract delete(url: string, data: any): Observable<Object>;
  abstract put(url: string, data: any): Observable<Object>;
}
