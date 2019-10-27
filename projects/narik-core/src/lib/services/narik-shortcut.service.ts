import { ShortcutService, ShortcutOptions } from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";
import { EventManager } from "@angular/platform-browser";
import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable()
export class NarikShortcutService extends ShortcutService {
  hotkeys = new Map();
  defaults: Partial<ShortcutOptions> = {
    element: this.document
  };

  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private document
  ) {
    super();
  }

  addShortcut(
    options: Partial<ShortcutOptions>
  ): Observable<{
    event: any;
    uniqueId: string;
  }> {
    const merged = { ...this.defaults, ...options };
    const event = `keydown.${merged.keys}`;

    if (merged.description) {
      this.hotkeys.set(merged.keys, merged.description);
    }

    return new Observable(observer => {
      const handler = e => {
        e.preventDefault();
        observer.next({
          event: e,
          uniqueId: merged.uniqueId
        });
      };

      const dispose = this.eventManager.addEventListener(
        merged.element,
        event,
        handler
      );

      return () => {
        dispose();
        this.hotkeys.delete(merged.keys);
      };
    });
  }
}
