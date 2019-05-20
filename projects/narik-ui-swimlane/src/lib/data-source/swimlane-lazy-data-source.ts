import {
  NarikDataSource,
  PagingParameters,
  DataInfo
} from "narik-infrastructure";
import { QueryService, ServerResponse } from "narik-app-core";
import { catchError } from "rxjs/internal/operators/catchError";
import { of } from "rxjs/internal/observable/of";
import { map } from "rxjs/internal/operators/map";
import { finalize } from "rxjs/internal/operators/finalize";
import { isArray } from "narik-common";
import { Observable } from "rxjs/internal/Observable";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class SwimlaneLazyDataSource<T> implements NarikDataSource<T> {
  loadOptions: any;
  totalCount = 0;
  currentData: T[];

  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  get dataObservable(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }
  get loadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  constructor(
    private queryService: QueryService<T>,
    private dataInfoGetter: () => DataInfo
  ) {}

  loadData(remoteDaraParams?: PagingParameters, dataParameters?: any) {
    this.loadDataInternal(this.loadOptions);
  }

  loadDataInternal(loadOptions: any) {
    if (!loadOptions.size) {
      return;
    }
    loadOptions = loadOptions || this.loadOptions;
    this.loadOptions = loadOptions;
    // let filterExpr;
    // if (loadOptions.filter) {
    //   filterExpr = this.compileCore(loadOptions.filter);
    // }

    const remoteDataParams = {
      pageIndex: loadOptions.index,
      pageCount: loadOptions.size,
      sort:
        loadOptions.sort && loadOptions.sort.length
          ? loadOptions.sort.map(x => {
              return {
                field: x.prop,
                order: x.dir
              };
            })
          : undefined,
      filter: loadOptions.filter
    };

    const dataInfo = this.dataInfoGetter();
    dataInfo.pagingParameter = remoteDataParams;
    this.loadingSubject.next(true);
    this.queryService
      .getList(dataInfo)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
        map((result: ServerResponse<T[]>) => {
          return {
            data: result.data,
            totalCount: result.count
          };
        })
      )
      .subscribe(result => {
        this.currentData = result.data;
        this.totalCount = result.totalCount;
        this.dataSubject.next(result.data);
      });
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
