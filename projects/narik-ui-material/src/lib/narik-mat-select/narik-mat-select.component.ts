import {
  Component,
  forwardRef,
  Injector,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { NARIK_MAT_FORM_INPUTS } from "../base/narik-mat-form-field";
import { NarikMatSelectBase } from "../base/narik-mat-select-base";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { startWith } from "rxjs/internal/operators/startWith";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { map } from "rxjs/internal/operators/map";
import { SPACE, ENTER } from "@angular/cdk/keycodes";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS, NARIK_SELECT_INPUTS, NARIK_DATA_DISPLAY_VALUE_OUTPUTS } from "../input-output-items";


@Component({
  selector: "narik-mat-select , narik-select",
  templateUrl: "narik-mat-select.component.html",
  styleUrls: ["narik-mat-select.component.css"],
  inputs: [
    ...NARIK_MAT_FORM_INPUTS,
    ...NARIK_DATA_DISPLAY_VALUE_INPUTS,
    ...NARIK_SELECT_INPUTS
  ],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikMatSelect),
      multi: true
    }
  ]
})
export class NarikMatSelect extends NarikMatSelectBase implements OnInit {
  optionData: any[] = [];
  filteredData: Observable<any[]>;
  textChanged = new Subject<{ filter: string; force: boolean }>();
  @ViewChild("input", { static: false })
  input: ElementRef;

  isOver = false;

  @Output()
  iconClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionData.filter(
      item => item[this.displayField].toLowerCase().indexOf(filterValue) === 0
    );
  }

  iconClick(icon) {
    this.iconClicked.emit(icon);
  }

  onKeydown(keyEvent: KeyboardEvent) {
    if (keyEvent.keyCode === SPACE) {
      keyEvent.stopPropagation();
      keyEvent.cancelBubble = true;
    }
  }
  keyUp(keyEvent: KeyboardEvent) {
    if (keyEvent.keyCode !== ENTER) {
      this.textChanged.next({
        filter: this.input.nativeElement.value,
        force: false
      });
    }
  }

  protected useData(data: any[]) {
    this.optionData = data;
    this.textChanged.next({
      filter: this.input ? this.input.nativeElement.value : null,
      force: true
    });
  }

  @HostListener("mouseover")
  onHover() {
    this.isOver = true;
  }

  @HostListener("mouseleave")
  onLeave() {
    this.isOver = false;
  }

  clear(e: MouseEvent) {
    this.value = undefined;
    e.stopPropagation();
    e.preventDefault();
  }

  refresh(e: MouseEvent) {
    this.reLoadData();
    e.stopPropagation();
    e.preventDefault();
  }
  ngOnInit() {
    super.ngOnInit();
    this.filteredData = this.textChanged.pipe(
      startWith(null),
      debounceTime(300),
      distinctUntilChanged(
        (
          x: { filter: string; force: boolean },
          y: { filter: string; force: boolean }
        ) => {
          return !!x && x.filter === y.filter && !y.force;
        }
      ),
      map((filterItem: { filter: string; force: boolean }) =>
        filterItem && filterItem.filter
          ? this._filter(filterItem.filter)
          : this.optionData.slice()
      )
    );
    this.detectChanges();
  }
}
