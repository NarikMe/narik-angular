import { Observable } from "rxjs/internal/Observable";

/**
 * Event aggregator service
 * A service that manage events inside application.
 */
export abstract class EventAggregatorService {

  /**
   * Publish event aggregator service
   * @param eventType eventType
   * @param eventArgs  event argument
   */
  abstract publish(eventType: any, eventArgs: any);

  /**
   * Listens event aggregator service
   * @param eventType  eventType
   * @returns  an `Observable` that emit whenever event occurs.
   */
  abstract  listen<T>(eventType: any): Observable<T>;
}
