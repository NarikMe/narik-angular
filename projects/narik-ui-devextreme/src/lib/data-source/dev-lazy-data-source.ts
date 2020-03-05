import CustomStore from "devextreme/data/custom_store";

import {
  NarikDataSource,
  PagingParameters,
  DataInfo
} from "@narik/infrastructure";
import { QueryService, ServerResponse } from "@narik/app-core";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { isArray } from "@narik/common";

export class DevLazyDataSource<T> implements NarikDataSource<T> {
  dataObservable;
  loadingObservable;
  loadOptions: any;
  store: CustomStore;
  currentData: T[];

  constructor(
    private queryService: QueryService<T>,
    private dataInfoGetter: () => DataInfo
  ) {
    this.store = new CustomStore({
      load: <any>((options: any) => this.loadDataInternal(options))
    });
  }

  loadData(remoteDaraParams?: PagingParameters, dataParameters?: any) {
    this.loadDataInternal(this.loadOptions);
  }

  loadDataInternal(loadOptions: any): Promise<any> {
    if (!loadOptions.take) {
      return;
    }
    loadOptions = loadOptions || this.loadOptions;
    this.loadOptions = loadOptions;
    let filterExpr;
    if (loadOptions.filter) {
      filterExpr = this.compileCore(loadOptions.filter);
    }

    const remoteDataParams = {
      pageIndex: loadOptions.skip / loadOptions.take,
      pageCount: loadOptions.take,
      sort:
        loadOptions.sort && loadOptions.sort.length
          ? loadOptions.sort.map(x => {
              return {
                field: x.selector,
                order: x.desc ? "desc" : "asc"
              };
            })
          : undefined,
      filter: filterExpr
        ? {
            condition: "and",
            filters: isArray(filterExpr) ? [...filterExpr] : [filterExpr]
          }
        : undefined
    };

    const dataInfo = this.dataInfoGetter();
    dataInfo.pagingParameter = remoteDataParams;
    return this.queryService
      .getList(dataInfo)
      .pipe(
        catchError(() => of([])),
        map((result: ServerResponse<T[]>) => {
          return {
            data: result.data,
            totalCount: result.count
          };
        })
      )
      .toPromise();
  }

  compileCore(criteria) {
    if (Array.isArray(criteria[0])) {
      return this.compileGroup(criteria);
    }

    if (this.isUnaryOperation(criteria)) {
      return this.compileUnary(criteria);
    }

    return this.compileBinary(criteria);
  }

  compileGroup(criteria) {
    const bag = [];
    let groupOperator;
    let nextGroupOperator;

    for (const criterion of criteria) {
      if (Array.isArray(criterion)) {
        if (bag.length > 1 && groupOperator !== nextGroupOperator) {
        }
        bag.push(this.compileCore(criterion));
        groupOperator = nextGroupOperator;
        nextGroupOperator = "and";
      } else {
        nextGroupOperator = this.isConjunctiveOperator(this) ? "and" : "or";
      }
    }

    return bag;
  }

  isUnaryOperation(crit) {
    return crit[0] === "!" && Array.isArray(crit[1]);
  }

  isDisjunctiveOperator(condition) {
    return /^(or|\|\||\|)$/i.test(condition);
  }

  isConjunctiveOperator(condition) {
    return /^(and|\&\&|\&)$/i.test(condition);
  }

  compileUnary(criteria) {
    const op = criteria[0];
    const crit = this.compileCore(criteria[1]);

    if (op === "!") {
      return "not (" + crit + ")";
    }
  }

  compileBinary(criteria) {
    criteria = this.normalizeBinaryCriterion(criteria);

    return {
      field: criteria[0],
      operator: this.findOperand(criteria[1]),
      value: criteria[2]
    };
  }

  normalizeBinaryCriterion(crit) {
    return [
      crit[0],
      crit.length < 3 ? "=" : String(crit[1]).toLowerCase(),
      crit.length < 2 ? true : crit[crit.length - 1]
    ];
  }

  findOperand(op) {
    const operands = {
      "=": "eq",
      "<>": "ne",
      ">": "gt",
      ">=": "ge",
      "<": "lt",
      "<=": "le",
      startswith: "startswith",
      endswith: "endswith"
    };
    return operands[op] || op;
  }
}
