import { ValidationService, NarikValidator } from "narik-infrastructure";
import { Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";

export class NarikValidationService extends ValidationService {
  _validators: any = {
    email: {
      func: Validators.email
    },
    max: {
      func: Validators.max,
      params: ["max"]
    },
    maxLength: {
      func: Validators.maxLength,
      params: ["maxLength"]
    },
    min: {
      func: Validators.min,
      params: ["min"]
    },
    minLength: {
      func: Validators.minLength,
      params: ["minLength"]
    },
    pattern: {
      func: Validators.pattern,
      params: ["pattern"]
    },
    required: {
      func: Validators.required
    },
    requiredTrue: {
      func: Validators.requiredTrue
    },
    base64: {
      func: CustomValidators.base64,
      params: ["min"]
    },
    creditCard: {
      func: CustomValidators.creditCard
    },
    date: {
      func: CustomValidators.date
    },
    dateISO: {
      func: CustomValidators.dateISO
    },
    digits: {
      func: CustomValidators.digits
    },
    equal: {
      func: CustomValidators.equal,
      params: ["equal"]
    },
    equalTo: {
      func: CustomValidators.equalTo,
      params: ["equalTo"]
    },
    gt: {
      func: CustomValidators.gt,
      params: ["gt"]
    },
    gte: {
      func: CustomValidators.gte,
      params: ["gte"]
    },
    json: {
      func: CustomValidators.json
    },
    lt: {
      func: CustomValidators.lt,
      params: ["lt"]
    },
    lte: {
      func: CustomValidators.lte,
      params: ["lte"]
    },
    maxDate: {
      func: CustomValidators.maxDate,
      params: ["maxDate"]
    },
    minDate: {
      func: CustomValidators.minDate,
      params: ["minDate"]
    },
    notEqual: {
      func: CustomValidators.notEqual,
      params: ["notEqual"]
    },
    notEqualTo: {
      func: CustomValidators.notEqualTo,
      params: ["notEqualTo"]
    },
    number: {
      func: CustomValidators.number
    },
    range: {
      func: CustomValidators.range,
      params: ["range"]
    },
    rangeLength: {
      func: CustomValidators.rangeLength,
      params: ["rangeLength"]
    },
    url: {
      func: CustomValidators.url
    },
    uuid: {
      func: CustomValidators.uuid
    }
  };

  addValidator(key: string, validator: NarikValidator) {
    this._validators[key] = validator;
  }

  validators() {
    return this._validators;
  }
}
