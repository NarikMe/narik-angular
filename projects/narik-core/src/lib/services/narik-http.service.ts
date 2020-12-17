import { HttpClient } from '@angular/common/http';
import { HttpService } from '@narik/infrastructure';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export class NarikHttpService extends HttpService {
  constructor(private httpClient: HttpClient) {
    super();
    console.log(typeof httpClient);
    console.log(httpClient);
  }

  get(url: string): Observable<Object> {
    console.log(url);
    return this.httpClient
      .get(url)
      .pipe<Object>(map((result) => this.extractData(result)));
  }
  post(url: string, data: any): Observable<Object> {
    return this.httpClient
      .post(url, data)
      .pipe<Object>(map((result) => this.extractData(result)));
  }
  delete(url: string, data: any): Observable<Object> {
    return this.httpClient.delete(url, data);
  }
  put(url: string, data: any): Observable<Object> {
    return this.httpClient.put(url, data);
  }

  private extractData(result: any): Object {
    if (result && result['@odata.context']) {
      if (result['@odata.count'] || result['@odata.count'] === 0) {
        return {
          count: result['@odata.count'],
          result: result.value,
        };
      } else if (result['@odata.null']) {
        return null;
      } else {
        return (<string>result['@odata.context']).endsWith('$entity')
          ? result
          : result.hasOwnProperty('value')
          ? result.value
          : result;
      }
    }
    return result || result === 0 || result === false
      ? result.data || result
      : null;
  }
}
