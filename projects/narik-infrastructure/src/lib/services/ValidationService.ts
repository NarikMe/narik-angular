import { ValidatorFn, ValidationErrors } from '@angular/forms';

export interface NarikValidator {
    func: (...args) => ValidatorFn | ValidationErrors | null;
    params: any[];
}

export abstract class ValidationService {
    abstract addValidator(key: string, validator: NarikValidator);
    abstract validators(): any;
}
