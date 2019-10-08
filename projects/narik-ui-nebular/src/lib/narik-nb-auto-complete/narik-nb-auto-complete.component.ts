import { NarikAutoComplete } from "narik-ui-core";

import { Component, forwardRef, Injector, OnInit, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { tap } from "rxjs/internal/operators/tap";
import { finalize } from "rxjs/internal/operators/finalize";
import { of } from "rxjs/internal/observable/of";
import { DataProviderService, MODULE_DATA_KEY } from "narik-infrastructure";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS, NARIK_DATA_DISPLAY_VALUE_OUTPUTS } from "../input-output-items";

@Component({
  selector: "narik-nb-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-nb-auto-complete.component.html",
  styleUrls: ["narik-nb-auto-complete.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNebularAutoComplete),
      multi: true
    }
  ]
})
export class NarikNebularAutoComplete extends NarikAutoComplete
  implements OnInit {
  internalChange = false;
  optionData: any[] = [];
  search: any;
  _displayValue: any;

  @Input()
  icon: any;

  set displayValue(value: any) {
    if (this._displayValue !== value) {
      if (!this.internalChange) {
        this.setValue(value);
      }
      this._displayValue = value;
    }
  }
  get displayValue(): any {
    return this._displayValue;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.loadDataOnInit = !this.isLazyLoadData;
    super.ngOnInit();
    if (!this.isLazyLoadData) {
      this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map((term: string) =>
            term.length < this.minSearchLength
              ? []
              : this.optionData
                  .filter(v =>
                    this.displayField
                      ? v[this.displayField]
                      : v.toLowerCase().indexOf(term.toLowerCase()) > -1
                  )
                  .map(v => (this.displayField ? v[this.displayField] : v))
                  .slice(0, 10)
          )
        );
    } else {
      const dataProviderService: DataProviderService = this.injector.get(
        DataProviderService
      );
      const dataInfo = this.createDataInfo();
      dataInfo.dataMethod = "POST";
      dataInfo.actionType = "COMPLETE";
      if (!dataInfo.moduleKey) {
        dataInfo.moduleKey = this.injector.get(MODULE_DATA_KEY);
      }

      this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap(filter => {
            if (filter && filter.length >= this.minSearchLength) {
              this.dataIsLoading = true;
            }
          }),
          switchMap(filter => {
            dataInfo.dataParameters = {
              filter: filter
            };
            return filter && filter.length >= this.minSearchLength
              ? dataProviderService.getData(dataInfo).pipe(
                  tap((result: any[]) => (this.optionData = result)),
                  finalize(() => (this.dataIsLoading = false))
                )
              : of([]);
          })
        );
    }
  }

  setValue(selectedText) {
    this.internalChange = true;
    if (!this.displayField) {
      this.value = selectedText;
    } else {
      if (selectedText) {
        const item = this.optionData.filter(
          x => x[this.displayField] === selectedText
        )[0];
        if (item) {
          this.value = item[this.valueField];
        } else {
          this.value = undefined;
        }
      } else {
        this.value = undefined;
      }
    }
    this.internalChange = false;
  }

  protected useData(data: any[]) {
    this.optionData = data;
  }

  setDisplayText() {
    this.internalChange = true;
    if (this.value) {
      const item = this.optionData.filter(
        x => x[this.valueField] === this.value
      )[0];
      this.displayValue = item ? item[this.displayField] : this.displayText;
    } else {
      this.displayValue = "";
    }
    this.internalChange = false;
  }

  protected valueChanged(newValue, oldValue) {
    if (newValue !== oldValue && !this.internalChange) {
      this.setDisplayText();
    }
  }

  onBlur() {
    if (!this.isLazyLoadData) {
      this.setDisplayText();
    }
  }
}
