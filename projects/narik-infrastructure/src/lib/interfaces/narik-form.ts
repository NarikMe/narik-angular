import { Observable } from "rxjs";

/**
 * Command host
 */
export interface CommandHost {
  /**
   * An `Observable` that emit whenever state of host changes.
   */
  readonly change: Observable<any>;
  processCommand(cmd: CommandInfo);
}

/**
 * Command info
 */
export interface CommandInfo {
  commandKey: string;
  commandData?: any;
}
