import { Observable } from "rxjs";
import { ShortcutOptions } from "../interfaces/shortcut-option";
export abstract class ShortcutService {
  abstract addShortcut(
    options: Partial<ShortcutOptions>
  ): Observable<{ event: any; uniqueId: string }>;
}
