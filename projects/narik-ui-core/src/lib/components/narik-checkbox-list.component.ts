import { isEquivalent } from '@narik/common';

import { AfterViewInit, QueryList, ViewChildren } from '@angular/core';

import { NarikDataDisplayValueComponent } from '../base/narik-data-display-value-component';
import { NarikCheckBox } from './narik-checkbox.component';
import { takeWhile } from 'rxjs/operators';

export class NarikCheckBoxList
    extends NarikDataDisplayValueComponent
    implements AfterViewInit {
    private isInternalChange = false;
    @ViewChildren(NarikCheckBox) checkBoxItems!: QueryList<NarikCheckBox>;

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value) {
            this.applyValueToItems();
        }
        if (this.checkBoxItems) {
            this.checkBoxItems.changes
                .pipe(takeWhile((x) => this.isAlive))
                .subscribe((x) => {
                    if (this.value) {
                        this.applyValueToItems();
                    }
                });
        }
    }

    addOrRemove(value: any) {
        if (!this.isInternalChange) {
            if (this.contains(value)) {
                this.remove(value);
            } else {
                this.add(value);
            }
        }
    }

    contains(value: any): boolean {
        if (this._value instanceof Array) {
            return this._value.indexOf(value) > -1;
        } else if (!!this._value) {
            return this._value === value;
        }
        return false;
    }

    private add(value: any) {
        if (!this.contains(value)) {
            if (this._value instanceof Array) {
                this._value.push(value);
            } else {
                this._value = [value];
            }
            this.onModelChange(this._value);
        }
    }

    private remove(value: any) {
        const index = this._value.indexOf(value);
        if (!this._value || index < 0) {
            return;
        }
        this._value.splice(index, 1);
        this.onModelChange(this._value);
    }

    valueChanged(newValue, oldValue) {
        if (!isEquivalent(newValue, oldValue)) {
            this.applyValueToItems();
        }
    }

    private applyValueToItems() {
        if (this.checkBoxItems) {
            this.isInternalChange = true;
            this.checkBoxItems.forEach((checkBoxItem) => {
                checkBoxItem.value = this.contains(checkBoxItem.tag);
            });
            this.isInternalChange = false;
        }
    }
    protected useData(data: any[]) {
        throw new Error('Method not implemented.');
    }
}
