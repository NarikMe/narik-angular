import { CommandHost, CommandInfo } from '@narik/infrastructure';

import { Input, EventEmitter, Output, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { isEquivalent } from '@narik/common';
import { NarikUiComponent } from '../base/narik-ui-component';

export abstract class NarikTreeview
  extends NarikUiComponent
  implements CommandHost {
  change$: Observable<any>;

  _selectedNode: any;

  set selectedNode(value: any) {
    if (!isEquivalent(this._dataSource, value)) {
      this._selectedNode = value;
      this.selectedNodeChange.emit(value);
    }
  }
  get selectedNode(): any {
    return this._selectedNode;
  }

  @Output()
  selectedNodeChange = new EventEmitter<any>();

  @Input()
  toolbarKey: string;

  _dataSource: any;
  @Input()
  set dataSource(value: any) {
    if (!isEquivalent(this._dataSource, value)) {
      this._dataSource = value;
      this.dataSourceChanged();
    }
  }
  get dataSource(): any {
    return this._dataSource;
  }

  /**
   *
   */
  constructor(injector: Injector) {
    super(injector);
  }
  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === 'add') {
      this.addNode(this.selectedNode);
    } else if (cmd.commandKey === 'delete') {
      if (this.selectedNode) {
        this.deleteNode(this.selectedNode);
      }
    }
  }

  abstract addNode(selectedNode: any);
  abstract deleteNode(selectedNode: any);

  dataSourceChanged() {}
}
