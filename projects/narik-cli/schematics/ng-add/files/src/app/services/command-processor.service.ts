import {
  CommandProcessor,
  CommandHost,
  CommandInfo
} from "@narik/infrastructure";
import { Injectable } from "@angular/core";
@Injectable()
export class DemoCommandProcessor implements CommandProcessor {
  constructor() {}
  processCommand(sender: CommandHost, cmd: CommandInfo) {}
}
