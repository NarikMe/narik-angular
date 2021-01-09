import { NarikTreeview } from '@narik/ui-core';
import { Component, Input, Injector } from '@angular/core';

@Component({
    selector: 'narik-prime-treeview narik-treeview',
    templateUrl: 'narik-prime-treeview.component.html',
})
export class NarikPrimeTreeview extends NarikTreeview {
    @Input()
    newNodeTitle: string;

    _selectedItem: any;
    set selectedItem(value: any) {
        this._selectedItem = value;
    }
    get selectedItem(): any {
        return this._selectedItem;
    }

    constructor(injector: Injector) {
        super(injector);
    }
    addNode(selectedNode: any) {
        throw new Error('Method not implemented.');
    }
    deleteNode(selectedNode: any) {
        throw new Error('Method not implemented.');
    }
}
