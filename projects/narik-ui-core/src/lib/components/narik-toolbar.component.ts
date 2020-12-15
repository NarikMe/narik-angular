import { UUID } from 'angular2-uuid';
import {
  MetaDataService,
  MODULE_UI_KEY,
  DefaultMetaDataKeys,
  CommandHost,
  CommandInfo,
  ShortcutService,
  DialogService,
  HOST_TOKEN,
  IsHost,
} from '@narik/infrastructure';
import { NarikInject } from '@narik/core';
import { getParentComponent } from '@narik/common';
import {
  Output,
  EventEmitter,
  Input,
  OnInit,
  Injector,
  ViewContainerRef,
  ElementRef,
  HostBinding,
} from '@angular/core';
import { isString, isArray, isElementVisible } from '@narik/common';
import { evalStringExpression } from '@narik/common';
import { debounceTime } from 'rxjs/operators';
import { NarikUiComponent } from '../base/narik-ui-component';
import { takeWhile } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

export interface ToolBarInfo {
  key: string;
  showLable?: boolean;
  items?: (ToolBarItem | string)[];
}
export interface ToolBarItem {
  key: string;
  itemType?: string;
  label?: string;
  tooltip?: string;
  icon?: string;
  fontIcon?: string;
  data?: any;
  hideExpr?: string;
  disableExpr?: string;
  busyExpr?: string;
  shortcut?: string;
  items?: (ToolBarItem | string)[];
}
export class NarikToolBar extends NarikUiComponent implements OnInit {
  readonly expressionPrefix = '$$$narik';
  invisibleItems: any = {};
  disableItems: any = {};
  busyItems: any = {};

  get uiKey(): string {
    return 'toolbar';
  }

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

  @NarikInject(ShortcutService)
  shortcutService: ShortcutService;

  @NarikInject(DialogService)
  dialogService: DialogService;

  @NarikInject(ElementRef)
  element: ElementRef;

  @Input()
  displayStyle = 'block';

  @HostBinding('style.display')
  get displayValue(): string {
    return this.displayStyle;
  }

  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector);

    this.host = injector.get(HOST_TOKEN, null) as CommandHost;

    if (!this.host && viewContainerRef) {
      this.host = getParentComponent<CommandHost>(viewContainerRef);
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
      if (IsHost(this.host)) {
        this.host.change$.pipe(debounceTime(100)).subscribe((x) => {
          this.applyContextExpressions();
        });
      }
      const uniqueId = UUID.UUID();

      for (const item of this.items) {
        if (item.shortcut) {
          this.shortcutService
            .addShortcut({
              keys: item.shortcut,
              description: item.tooltip,
              uniqueId: uniqueId,
            })
            .pipe(
              takeWhile((x) => this.isAlive),
              filter(
                (x: any) =>
                  x.uniqueId === uniqueId &&
                  isElementVisible(this.element) &&
                  this.dialogService.isElementInActiveDialog(this.element)
              )
            )
            .subscribe((x) => {
              this.itemCommand(item);
            });
        }
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
      showLabel: toolBarInfo && !!toolBarInfo.showLable,
    };
  }

  protected toToolbarItem(
    item: ToolBarItem | string
  ): ToolBarItem | ToolBarItem[] {
    if (isString(item)) {
      if ((item as string).startsWith('&&')) {
        return this.createToolbarItems(
          this.moduleKey,
          (item as string).replace('&&', '')
        ).items;
      } else {
        return {
          key: item as string,
          icon: item as string,
          itemType: (item as string) === '-' ? 'divider' : 'button',
          tooltip: (item as string) + '_command_tooltip',
        };
      }
    } else {
      const tItem = item as ToolBarItem;

      const i = {
        key: tItem.key,
        icon: !tItem.icon && !tItem.fontIcon ? tItem.key : tItem.icon,
        fontIcon: tItem.fontIcon,
        itemType: tItem.itemType || 'button',
        tooltip: tItem.tooltip || tItem.key + '_command_tooltip',
        data: tItem.data,
        shortcut: tItem.shortcut,
        items: tItem.items ? tItem.items.map((x) => this.toToolbarItem(x)) : [],
        label: tItem.label || tItem.key,
        hideExpr: tItem.hideExpr
          ? evalStringExpression(tItem.hideExpr, ['host'])
          : null,
        disableExpr: tItem.disableExpr
          ? evalStringExpression(tItem.disableExpr, ['host'])
          : null,
        busyExpr: tItem.busyExpr
          ? evalStringExpression(tItem.busyExpr, ['host'])
          : null,
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
      if (!key.startsWith('$$$') && obj.hasOwnProperty(key)) {
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
    if (data.disableExpr && this.disableItems[data.key]) {
      console.log('disabled toolbar item clicked!!' + data.key);
      return;
    }
    if (this.host && !this.alwaysCallCommand) {
      this.host.processCommand({
        commandKey: data.key,
        commandData: data.data,
      });
    } else {
      this.command.emit({
        commandKey: data.key,
        commandData: data.data,
      });
    }
  }
}
