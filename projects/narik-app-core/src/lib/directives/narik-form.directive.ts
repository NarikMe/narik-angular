import { NarikDynamicForm } from "narik-ui-core";
import {
  Directive,
  ElementRef,
  OnInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  QueryList,
  OnDestroy,
  AfterContentInit,
  TemplateRef
} from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Subscription } from "rxjs/internal/Subscription";
import { takeWhile } from "rxjs/internal/operators/takeWhile";

@Directive({
  selector: "narik-form"
})
export class NarikForm
  implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  isAlive = true;
  private _dynamicForms = new Map<NarikDynamicForm, Subscription>();
  children: QueryList<NarikDynamicForm>;
  dd: TemplateRef<any>[];
  contentChildren = [];

  @ContentChildren(NarikDynamicForm) contentList: QueryList<NarikDynamicForm>;

  @ContentChild("form", { static: false })
  form: NgForm;

  @ContentChildren(NarikDynamicForm, { descendants: true })
  set dynamicForm(values: QueryList<NarikDynamicForm>) {
    this.children = values;
    if (values) {
      values.changes.subscribe(res => {});
      const valueArray = values.toArray();
      for (const value of valueArray) {
        if (!this._dynamicForms.has(value)) {
          const sub = value.modelsChaned
            .pipe(takeWhile(x => this.isAlive))
            .subscribe(result => {
              if (result) {
                this.applyNgModels(result.items, result.removed);
              }
            });
          this._dynamicForms.set(value, sub);
        }
      }
    }
  }

  @ContentChildren(NgModel, { descendants: true })
  public set models(value: QueryList<NgModel>) {
    const modelArray = value.toArray();
  }

  constructor(private formElement: ElementRef) {}

  ngOnInit() {}

  updateViewElements() {}

  updateContentElements() {
    setTimeout(() => (this.contentChildren = this.contentList.toArray()));
  }

  ngAfterViewInit() {
    this.updateViewElements();
  }

  ngAfterContentInit() {
    this.contentList.changes.subscribe(() => this.updateContentElements());
    this.updateContentElements();
  }

  private applyNgModels(ngModels: NgModel[], removed: string[]) {}

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
