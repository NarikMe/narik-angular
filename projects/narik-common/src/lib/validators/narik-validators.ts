import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NarikValidators {
  static GeneralValidator(
    validatorItems: any = {},
    validators: string[],
    validatorParams?: any
  ): ValidatorFn {
    const validatorFn = (control: AbstractControl): ValidationErrors => {
      for (const validator of validators) {
        const validatorItem = validatorItems
          ? validatorItems[validator]
          : undefined;
        if (validatorItem) {
          let func;
          if (validatorItem.params && validatorItem.params.length) {
            validatorParams = validatorParams || {};
            const paramArray = validatorItem.params.map(
              (p) => validatorParams[p]
            );
            func = validatorItem.func(...paramArray);
          } else {
            func = validatorItem.func;
          }
          const result = func(control);
          if (result) {
            return result;
          }
        }
      }
    };
    return validatorFn;
  }
}
