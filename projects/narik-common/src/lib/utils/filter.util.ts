import { FilterItems, FilterItem } from "narik-infrastructure";
import { isPresent, isBlank, isDate, isFunction } from "./object.util";
import { isString } from "./string.util";

const getterCache = {};
const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const dateRegExp = /^\/Date\((.*?)\)\/$/;

const logic = {
  or: {
    concat: function(acc, fn) {
      return function(a) {
        return acc(a) || fn(a);
      };
    },
    identity: function() {
      return false;
    }
  },
  and: {
    concat: function(acc, fn) {
      return function(a) {
        return acc(a) && fn(a);
      };
    },
    identity: function() {
      return true;
    }
  }
};

const operatorsMap = {
  contains: function(a, b) {
    return (a || "").indexOf(b) >= 0;
  },
  doesnotcontain: function(a, b) {
    return (a || "").indexOf(b) === -1;
  },
  doesnotendwith: function(a, b) {
    return (a || "").indexOf(b, (a || "").length - (b || "").length) < 0;
  },
  doesnotstartwith: function(a, b) {
    return (a || "").lastIndexOf(b, 0) === -1;
  },
  endswith: function(a, b) {
    return (a || "").indexOf(b, (a || "").length - (b || "").length) >= 0;
  },
  eq: function(a, b) {
    return a === b;
  },
  gt: function(a, b) {
    return a > b;
  },
  gte: function(a, b) {
    return a >= b;
  },
  isempty: function(a) {
    return a === "";
  },
  isnotempty: function(a) {
    return a !== "";
  },
  isnotnull: function(a) {
    return isPresent(a);
  },
  isnull: function(a) {
    return isBlank(a);
  },
  lt: function(a, b) {
    return a < b;
  },
  lte: function(a, b) {
    return a <= b;
  },
  neq: function(a, b) {
    return a !== b;
  },
  startswith: function(a, b) {
    return (a || "").lastIndexOf(b, 0) === 0;
  }
};

export function toFilterFunction(
  filters: FilterItems
): (data: any) => boolean {
  if (!filters || filters.filters.length === 0) {
    return function() {
      return true;
    };
  }
  return transformCompositeFilter(filters);
}

function transformCompositeFilter(filter: FilterItems) {
  const combiner = logic[filter.condition];
  return filter.filters
    .filter(isPresent)
    .map(function(x) {
      return isCompositeFilterDescriptor(x)
        ? transformCompositeFilter(x as FilterItems)
        : transformFilter(x as FilterItem);
    })
    .reduce(combiner.concat, combiner.identity);
}

function isCompositeFilterDescriptor(
  filter: FilterItems | FilterItem
): boolean {
  return filter.hasOwnProperty("filters");
}

function transformFilter(filter: FilterItem) {
  let field: any = filter.field,
    ignoreCase = true,
    value = filter.value;
  const operator = filter.operator;
  field = !isPresent(field)
    ? function(a) {
        return a;
      }
    : field;
  ignoreCase = isPresent(ignoreCase) ? ignoreCase : true;
  const itemProp = typedGetter(
    isFunction(field) ? field : getter(field, true),
    value,
    ignoreCase
  );
  value = convertValue(value, ignoreCase);
  const op = isFunction(operator) ? operator : operatorsMap[operator];
  return function(a) {
    return op(itemProp(a), value, ignoreCase);
  };
}

function typedGetter(prop, value, ignoreCase) {
  if (!isPresent(value)) {
    return prop;
  }
  let acc = prop;
  if (isString(value)) {
    const date = dateRegExp.exec(value);
    if (date) {
      value = new Date(+date[1]);
    } else if (ignoreCase) {
      acc = function(a) {
        const x = prop(a);
        return typeof x === "string" ? x.toLowerCase() : x;
      };
    }
  }
  if (isDate(value)) {
    return function(a) {
      const x = acc(a);
      return isDate(x) ? x.getTime() : x;
    };
  }
  return acc;
}

getterCache["undefined"] = function(obj) {
  return obj;
};

function getter(field, safe) {
  const key = field + safe;
  if (getterCache[key]) {
    return getterCache[key];
  }
  const fields = [];
  field.replace(FIELD_REGEX, function(_, index, indexAccessor, ifield) {
    fields.push(isPresent(index) ? index : indexAccessor || ifield);
    return undefined;
  });
  getterCache[key] = function(obj) {
    let result = obj;
    for (let idx = 0; idx < fields.length; idx++) {
      result = result[fields[idx]];
      if (!isPresent(result) && safe) {
        return result;
      }
    }
    return result;
  };
  return getterCache[key];
}

function convertValue(value, ignoreCase) {
  if (value != null && isString(value)) {
    const date = dateRegExp.exec(value);
    if (date) {
      return new Date(+date[1]).getTime();
    } else if (ignoreCase) {
      return value.toLowerCase();
    }
  } else if (value != null && isDate(value)) {
    return value.getTime();
  }
  return value;
}
