import {
  MetaDataService,
  MODULE_UI_KEY,
  DefaultMetaDataKeys,
  CommandHost,
  CommandInfo
} from "narik-infrastructure";
import { NarikInject } from "narik-core";
import {
  Output,
  EventEmitter,
  Input,
  OnInit,
  Injector,
  ViewContainerRef
} from "@angular/core";
import { isString, isArray } from "narik-common";
import { evalStringExpression } from "narik-common";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { NarikUiComponent } from "../base/narik-ui-component";

export interface ToolBarInfo {
  key: string;
  showLable?: boolean;
  items?: (ToolBarItem | string)[];
}
export interface ToolBarItem {
  key: string;
  itemType?: string;
  label?: string;
  hint?: string;
  icon?: string;
  data?: any;
  hideExpr?: string;
  disableExpr?: string;
  busyExpr?: string;
  items?: (ToolBarItem | string)[];
}
export class NarikToolBar extends NarikUiComponent implements OnInit {
  readonly expressionPrefix = "$$$narik";
  invisibleItems: any = {};
  disableItems: any = {};
  busyItems: any = {};

  @Input()
  showLabel: boolean;

  @Input()
  host: CommandHost;

  @Input()
  moduleKey: string;

  @Input()
  toolbarKey: string;

  @Input()
  cssClass: string;

  @Input()
  color: string;

  @Input()
  itemsStyle: string;

  @Input()
  itemsCssClass: string;

  @Input()
  items: ToolBarItem[];

  @Input()
  alwaysCallCommand = false;

  @Output()
  command = new EventEmitter<CommandInfo>();

  @NarikInject(MetaDataService)
  metaDataService: MetaDataService;

  @NarikInject(MODULE_UI_KEY)
  defaultModuleKey: string;

  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector);
    if (viewContainerRef && viewContainerRef["_view"]) {
      this.host = viewContainerRef["_view"].component;
    }
  }

  ngOnInit() {
    if (this.toolbarKey) {
      this.moduleKey = this.moduleKey || this.defaultModuleKey;

      const info = this.createToolbarItems(this.moduleKey, this.toolbarKey);
      if (this.showLabel === undefined) {
        this.showLabel = info.showLabel;
      }
      this.items = info.items;
      if (this.host && this.host.change) {
        this.host.change.pipe(debounceTime(100)).subscribe(x => {
          this.applyContextExpressions();
        });
      }
    }
  }

  private createToolbarItems(
    moduleKey: string,
    toolbarKey: string
  ): { items: ToolBarItem[]; showLabel: boolean } {
    const toolBarInfo = this.metaDataService.getInformation<ToolBarInfo>(
      DefaultMetaDataKeys.toolbars,
      moduleKey,
      toolbarKey
    );
    const items = [];
    if (toolBarInfo) {
      for (const item of toolBarInfo.items) {
        const tollBarItem = this.toToolbarItem(item);
        if (isArray(tollBarItem)) {
          items.push(...(tollBarItem as ToolBarItem[]));
        } else {
          items.push(tollBarItem);
        }
      }
      this.items = items;
    }
    return {
      items: items,
      showLabel: toolBarInfo && !!toolBarInfo.showLable
    };
  }

  protected toToolbarItem(
    item: ToolBarItem | string
  ): ToolBarItem | ToolBarItem[] {
    if (isString(item)) {
      if ((item as string).startsWith("&&")) {
        return this.createToolbarItems(
          this.moduleKey,
          (item as string).replace("&&", "")
        ).items;
      } else {
        return {
          key: item as string,
          icon: item as string,
          itemType: (item as string) === "-" ? "divider" : "button",
          hint: (item as string) + "_command_hint"
        };
      }
    } else {
      const tItem = item as ToolBarItem;

      const i = {
        key: tItem.key,
        icon: tItem.icon || tItem.key,
        itemType: tItem.itemType || "button",
        hint: tItem.hint || tItem.key + "_command_hint",
        data: tItem.data,
        items: tItem.items ? tItem.items.map(x => this.toToolbarItem(x)) : [],
        label: tItem.label || tItem.key,
        hideExpr: tItem.hideExpr
          ? evalStringExpression(tItem.hideExpr, ["host"])
          : null,
        disableExpr: tItem.disableExpr
          ? evalStringExpression(tItem.disableExpr, ["host"])
          : null,
        busyExpr: tItem.busyExpr
          ? evalStringExpression(tItem.busyExpr, ["host"])
          : null
      };
      if (i.busyExpr) {
        this.busyItems[i.key] = false;
        this.busyItems[this.expressionPrefix + i.key] = i.busyExpr;
      }
      if (i.disableExpr) {
        this.disableItems[i.key] = false;
        this.disableItems[this.expressionPrefix + i.key] = i.disableExpr;
      }
      if (i.hideExpr) {
        this.invisibleItems[i.key] = false;
        this.invisibleItems[this.expressionPrefix + i.key] = i.hideExpr;
      }
      return i as ToolBarItem;
    }
  }

  applyExpressionsOnObject(obj: any) {
    for (const key in obj) {
      if (!key.startsWith("$$$") && obj.hasOwnProperty(key)) {
        obj[key] = obj[this.expressionPrefix + key].apply(null, [this.host]);
      }
    }
  }

  applyContextExpressions(): any {
    this.applyExpressionsOnObject(this.invisibleItems);
    this.applyExpressionsOnObject(this.disableItems);
    this.applyExpressionsOnObject(this.busyItems);
  }
  itemCommand(data: ToolBarItem) {
    if (this.host && !this.alwaysCallCommand) {
      this.host.processCommand({
        commandKey: data.key,
        commandData: data.data
      });
    } else {
      this.command.emit({
        commandKey: data.key,
        commandData: data.data
      });
    }
  }
}
