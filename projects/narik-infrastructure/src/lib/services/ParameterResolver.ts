import { Observable } from "rxjs";

/**
 * Parameter resolver
 */
export abstract class ParameterResolver {

  /**
   * Gets parameter resolver
   * @param key
   * @returns get
   */
  abstract get(key: any): any;

  /**
   * Listens parameter resolver
   * @template T
   * @param key
   * @returns listen
   */
  abstract  listen<T>(key: any): Observable<T>;
}
