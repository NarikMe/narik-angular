import { Observable } from "rxjs/internal/Observable";

/**
 * Json service
 */
export abstract class JsonService {

  /**
   * Gets json
   * @param path path to json
   * @returns json
   */
  abstract getJson(path: string): Observable<any>;
}
