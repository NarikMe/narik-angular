import { Observable } from 'rxjs';

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
