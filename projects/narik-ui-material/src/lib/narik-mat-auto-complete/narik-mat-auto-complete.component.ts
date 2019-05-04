import { DataProviderService, MODULE_DATA_KEY } from "narik-infrastructure";
import {
  NARIK_DATA_DISPLAY_VALUE_INPUTS,
  NARIK_DATA_DISPLAY_VALUE_OUTPUTS
} from "narik-ui-core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { finalize } from "rxjs/internal/operators/finalize";
import { map } from "rxjs/internal/operators/map";
import { startWith } from "rxjs/internal/operators/startWith";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { tap } from "rxjs/internal/operators/tap";
import { Subject } from "rxjs/internal/Subject";

import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { NarikMatAutoCompleteBase } from "../base/narik-mat-auto-complete-base";
import { NARIK_MAT_FORM_INPUTS } from "../base/narik-mat-form-field";

@Component({
  selector: "narik-mat-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-mat-auto-complete.component.html",
  styleUrls: ["narik-mat-auto-complete.component.css"],
  inputs: [...NARIK_MAT_FORM_INPUTS, ...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikMatAutoComplete),
      multi: true
    }
  ]
})
export class NarikMatAutoComplete extends NarikMatAutoCompleteBase
  implements OnInit {
  filteredData: Observable<any[]>;
  optionData: any[] = [];
  textChanged = new Subject<string>();

  @ViewChild("input")
  input: ElementRef;

  @Input()
  displayText: string;

  @Input()
  minLenToShowAutoComplete = 0;

  @Input()
  isLazyLoadData = false;

  constructor(injector: Injector) {
    super(injector);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionData.filter(
      item => item[this.displayField].toLowerCase().indexOf(filterValue) === 0
    );
  }

  protected useData(data: any[]) {
    this.optionData = data;
    if (!this.isLazyLoadData) {
      this.textChanged.next(this.input ? this.input.nativeElement.value : null);
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
          filter && filter.length >= this.minLenToShowAutoComplete
            ? this._filter(filter)
            : this.minLenToShowAutoComplete === 0
            ? this.optionData.slice()
            : []
        )
      );
    } else {
      const dataProviderService = this.injector.get(DataProviderService);
      const dataInfo = this.createDataInfo();
      dataInfo.dataMethod = "POST";
      dataInfo.actionType = "COMPLETE";

      if (!dataInfo.moduleKey) {
        dataInfo.moduleKey = this.injector.get(MODULE_DATA_KEY);
      }
      this.filteredData = this.textChanged.pipe(
        startWith(null),
        debounceTime(300),
        distinctUntilChanged(),
        tap(filter => {
          if (filter && filter.length >= this.minLenToShowAutoComplete) {
            this.dataIsLoading = true;
          }
        }),
        switchMap(filter => {
          dataInfo.dataParameters = {
            filter: filter
          };
          return filter && filter.length >= this.minLenToShowAutoComplete
            ? dataProviderService.getData(dataInfo).pipe(
                tap((result: any[]) => (this.optionData = result)),
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
        x => x[this.valueField] === this.value
      )[0];
      this.input.nativeElement.value = item
        ? item[this.displayField]
        : this.displayText;
    } else {
      this.input.nativeElement.value = "";
    }
  }

  protected valueChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.setDisplayText();
    }
  }
}
