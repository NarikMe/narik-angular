import { isObservable, Observable } from 'rxjs';

export interface Host {
  /**
   * An `Observable` that emit whenever state of host changes.
   */
  readonly change$: Observable<any>;
}

export function IsHost(obj: any): obj is Host {
  return obj && 'change$' in obj && isObservable(obj.change$);
}
/**
 * Command host
 */
export interface CommandHost extends Host {
  processCommand(cmd: CommandInfo);
}
export interface FormHost extends Host {}

/**
 * Command info
 */
export interface CommandInfo {
  commandKey: string;
  commandData?: any;
}
