import { DataProviderService, MODULE_DATA_KEY } from '@narik/infrastructure';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
    Component,
    ElementRef,
    forwardRef,
    Injector,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NarikMatAutoCompleteBase } from '../base/narik-mat-auto-complete-base';
import { NARIK_MAT_FORM_INPUTS } from '../base/narik-mat-form-field';
import {
    NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
    NARIK_DATA_DISPLAY_VALUE_INPUTS,
    NARIK_AUTOCOMPLETE_INPUTS,
} from '../input-output-items';

@Component({
    selector: 'narik-mat-autocomplete  , narik-autocomplete ',
    templateUrl: 'narik-mat-auto-complete.component.html',
    styleUrls: ['narik-mat-auto-complete.component.css'],
    inputs: [
        ...NARIK_MAT_FORM_INPUTS,
        ...NARIK_DATA_DISPLAY_VALUE_INPUTS,
        ...NARIK_AUTOCOMPLETE_INPUTS,
    ],
    outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikMatAutoComplete),
            multi: true,
        },
    ],
})
export class NarikMatAutoComplete
    extends NarikMatAutoCompleteBase
    implements OnInit {
    filteredData: Observable<any[]>;
    optionData: any[] = [];
    textChanged = new Subject<string>();

    @ViewChild('input', { static: true })
    input: ElementRef;

    constructor(injector: Injector) {
        super(injector);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.optionData.filter(
            (item) =>
                item[this.displayField].toLowerCase().indexOf(filterValue) === 0
        );
    }

    protected useData(data: any[]) {
        this.optionData = data;
        if (!this.isLazyLoadData) {
            this.textChanged.next(
                this.input ? this.input.nativeElement.value : null
            );
        }
        this.setDisplayText();
    }

    keyUp(key) {
        if (key.keyCode !== 13) {
            this.textChanged.next(this.input.nativeElement.value);
            if (!this.input.nativeElement.value && !this.required) {
                this.value = undefined;
            }
        }
    }
    ngOnInit() {
        this.loadDataOnInit = !this.isLazyLoadData;
        super.ngOnInit();
        if (!this.isLazyLoadData) {
            this.filteredData = this.textChanged.pipe(
                startWith(null),
                debounceTime(300),
                distinctUntilChanged(),
                map((filter: string | null) =>
                    filter && filter.length >= this.minSearchLength
                        ? this._filter(filter)
                        : this.minSearchLength === 0
                        ? this.optionData.slice()
                        : []
                )
            );
        } else {
            const dataProviderService: DataProviderService = this.injector.get(
                DataProviderService
            );
            const dataInfo = this.createDataInfo();
            dataInfo.dataMethod = 'POST';
            dataInfo.actionType = 'COMPLETE';

            if (!dataInfo.moduleKey) {
                dataInfo.moduleKey = this.injector.get(MODULE_DATA_KEY);
            }
            this.filteredData = this.textChanged.pipe(
                startWith(null),
                debounceTime(300),
                distinctUntilChanged(),
                tap((filter) => {
                    if (filter && filter.length >= this.minSearchLength) {
                        this.dataIsLoading = true;
                    }
                }),
                switchMap((filter) => {
                    dataInfo.dataParameters = {
                        filter: filter,
                    };
                    return filter && filter.length >= this.minSearchLength
                        ? dataProviderService.getData(dataInfo).pipe(
                              tap(
                                  (result: any[]) => (this.optionData = result)
                              ),
                              finalize(() => (this.dataIsLoading = false))
                          )
                        : of([]);
                })
            );
        }
    }

    optionSelected(e) {
        this.input.nativeElement.value = e.option.viewValue;
        this.value = e.option.value;
    }

    setDisplayText() {
        if (this.value) {
            const item = this.optionData.filter(
                (x) => x[this.valueField] === this.value
            )[0];
            this.input.nativeElement.value = item
                ? item[this.displayField]
                : this.displayText;
        } else {
            this.input.nativeElement.value = '';
        }
    }

    protected valueChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.setDisplayText();
        }
    }
}
