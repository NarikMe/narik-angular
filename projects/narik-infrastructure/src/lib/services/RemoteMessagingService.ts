import { Observable } from 'rxjs';

/**
 * Remote messaging service
 */
export abstract class RemoteMessagingService {
    /**
     * Listens remote messaging service
     * @template T
     * @param messageType
     * @returns listen
     */
    abstract listen<T>(messageType: any): Observable<T>;

    /**
     * Connects remote messaging service
     * @returns connect
     */
    abstract connect(): Promise<any>;

    /**
     * Dis connect
     * @returns connect
     */
    abstract disConnect(): Promise<any>;
}
