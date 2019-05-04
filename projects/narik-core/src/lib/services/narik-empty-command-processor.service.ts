import {
  CommandProcessor,
  CommandInfo,
  CommandHost
} from "narik-infrastructure";

export class NarikEmptyCommandProcessor implements CommandProcessor {
  processCommand(sender: CommandHost, cmd: CommandInfo) {}
}
