import { Directive, Input } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  Validators
} from "@angular/forms";
import { ValidationService } from "@narik/infrastructure";

@Directive({
  selector: "[narikValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NarikValidatorDirective,
      multi: true
    }
  ]
})
export class NarikValidatorDirective implements Validator {
  @Input("narikValidator")
  narikValidator: string[];

  @Input("narikValidatorParams")
  narikValidatorParams: any = {};

  validators: any = {};

  constructor(validationService: ValidationService) {
    this.validators = validationService.validators();
  }
  validate(c: AbstractControl) {
    if (this.narikValidator) {
      for (const validator of this.narikValidator) {
        const validatorItem = this.validators[validator];
        if (validatorItem) {
          let func;
          if (validatorItem.params && validatorItem.params.length) {
            this.narikValidatorParams = this.narikValidatorParams || {};
            const paramArray = validatorItem.params.map(
              p => this.narikValidatorParams[p]
            );
            func = validatorItem.func(...paramArray);
          } else {
            func = validatorItem.func;
          }
          const result = func(c);
          if (result) {
            return result;
          }
        }
      }
    }

    return null;
  }
}
