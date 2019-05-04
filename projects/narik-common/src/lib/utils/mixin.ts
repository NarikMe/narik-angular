export function Mixin<T>(
  ...mixins: Array<new (...args: any[]) => any>
): new (...args: any[]) => T {
  const result = mixins.reduceRight(
    (prev, cur) => __extends(cur, prev),
    class {}
  );
  return result;
}

function __extends(f: MixinFunction, s: MixinFunction): MixinFunction {
  const mixedClass = class {
    constructor() {
      return f.apply(s.apply(this, arguments) || this, arguments);
    }
  };
  let superClass = f["__proto__"];
  const supperClasses: any[] = [];
  while (superClass && superClass["name"]) {
    supperClasses.unshift(superClass);
    superClass = superClass["__proto__"];
  }
  for (const item of supperClasses) {
    _applyClassItems(mixedClass, item, s);
  }
  _applyClassItems(mixedClass, f, s);

  return mixedClass;
}

function _applyClassItems(mixedClass: any, f: MixinFunction, s: MixinFunction) {
  if (s.prototype) {
    for (const p in s.prototype) {
      if (s.prototype.hasOwnProperty(p)) {
        const descriptor = Object.getOwnPropertyDescriptor(s.prototype, p);
        Object.defineProperty(mixedClass.prototype, p, descriptor);
      }
    }
  }
  if (f.prototype) {
    for (const p in f.prototype) {
      if (f.prototype.hasOwnProperty(p)) {
        const descriptor = Object.getOwnPropertyDescriptor(f.prototype, p);
        Object.defineProperty(mixedClass.prototype, p, descriptor);
      }
    }
  }

  //
  for (const p in s) {
    if (s.hasOwnProperty(p) && p !== "propDecorators") {
      mixedClass[p] = s[p];
    }
  }
  for (const p in f) {
    if (f.hasOwnProperty(p) && p !== "propDecorators") {
      mixedClass[p] = f[p];
    }
  }

  if (s["propDecorators"]) {
    if (!mixedClass["propDecorators"]) {
      mixedClass["propDecorators"] = {};
    }
    for (const p in s["propDecorators"]) {
      if (s["propDecorators"].hasOwnProperty(p)) {
        mixedClass["propDecorators"][p] = s["propDecorators"][p];
      }
    }
  }

  if (f["propDecorators"]) {
    if (!mixedClass["propDecorators"]) {
      mixedClass["propDecorators"] = {};
    }
    for (const p in f["propDecorators"]) {
      if (f["propDecorators"].hasOwnProperty(p)) {
        mixedClass["propDecorators"][p] = f["propDecorators"][p];
      }
    }
  }
}

interface MixinFunction {
  new (...args: any[]): any;
}
