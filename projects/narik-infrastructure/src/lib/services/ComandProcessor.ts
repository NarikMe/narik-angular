import { CommandInfo, CommandHost } from "../interfaces/narik-form";


 /**
 * A service that applications can use to process commands.
 {@link https://github.com/NarikMe/narik-angular/wiki/commands | more information }
 */


export abstract class CommandProcessor {

  /**
   * Process command
   * @param sender  command host that call this method
   * @param cmd commandInfo
   */
  abstract processCommand(sender: CommandHost, cmd: CommandInfo);
}
