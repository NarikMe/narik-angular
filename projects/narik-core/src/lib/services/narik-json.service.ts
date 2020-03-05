import { NarikHttpService } from "./narik-http.service";
import { Injectable } from "@angular/core";
import { JsonService, FilterItems } from "@narik/infrastructure";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { of, forkJoin } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  isString,
  isArray,
  toFilterFunction,
  getNestedValue
} from "@narik/common";

@Injectable()
export class NarikJsonService extends JsonService {
  private jsons = new Map<string, any>();
  constructor(private httpService: NarikHttpService) {
    super();
  }

  getJson(path: string): Observable<any> {
    const jsonData = this.jsons.get(path);
    return jsonData
      ? of(jsonData)
      : this.httpService.get(path).pipe(
          mergeMap(x => this.applyExtends(path, x)),
          map(data => {
            delete data["extends"];
            delete data["imports"];
            delete data["variables"];
            delete data["removeItems"];
            return data;
          }),
          tap(x => {
            this.jsons.set(path, x);
          })
        );
  }

  private applyExtends(dataPath: string, data: any): Observable<any> {
    if (data && data.extends) {
      const extendsPath = this.resolvePath(dataPath, data.extends);
      return this.getJson(extendsPath).pipe(
        mergeMap(parentData =>
          this.applyImports(dataPath, this.applyJsonExtends(parentData, data))
        )
      );
    } else {
      return this.applyImports(dataPath, data);
    }
  }

  private resolvePath(basePath: string, path: string): string {
    const stack = basePath.split("/"),
      parts = path.split("/");
    stack.pop();
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === ".") {
        continue;
      }
      if (parts[i] === "..") {
        stack.pop();
      } else {
        stack.push(parts[i]);
      }
    }
    return stack.join("/");
  }
  private applyImports(dataPath: string, data: any): Observable<any> {
    if (data && data.imports) {
      const loaders: any[] = [];
      for (const key in data.imports) {
        if (data.imports.hasOwnProperty(key)) {
          const element = data.imports[key];
          const importPath = this.resolvePath(dataPath, element);
          loaders.push(
            this.getJson(importPath).pipe(
              map(x => {
                return { key, data: x };
              })
            )
          );
        }
      }
      return Observable.create(observer => {
        forkJoin(loaders).subscribe(items => {
          observer.next(
            this.applyVariables(this.applyJsonImports(data, items))
          );
        });
      });
    } else {
      return of(this.applyVariables(data));
    }
  }

  private isJSON(json): boolean {
    if (json && json.constructor.name === "Object") {
      return true;
    } else {
      return false;
    }
  }

  private cloneJSON(data): any {
    return this.applyJsonExtends({}, data);
  }

  private applyRemoves(data, removeItems: string[]): any {
    if (removeItems) {
      this.applyJsonRemoves(data, removeItems);
    }
    return data;
  }
  private applyJsonRemoves(data, removeItems: string[]): any {
    if (this.isJSON(data)) {
      for (const removeItem of removeItems) {
        if (removeItem.indexOf("[") >= 0) {
          const dataItemKey = removeItem.substr(0, removeItem.indexOf("["));
          const dataItem = getNestedValue(data, dataItemKey);
          if (isArray(dataItem)) {
            let dataItemIndex = removeItem.substring(
              removeItem.indexOf("[") + 1,
              removeItem.lastIndexOf("]")
            );
            if (!isNaN(+dataItemIndex)) {
              dataItem.splice(+dataItemIndex, 1);
            } else {
              dataItemIndex = dataItemIndex.replace(/'/g, '"');
              const filterFunction = toFilterFunction(JSON.parse(
                dataItemIndex
              ) as FilterItems);
              const removedDataItems = dataItem.filter(filterFunction);
              for (const removedDataItem of removedDataItems) {
                const dataItemPos = dataItem.indexOf(removedDataItem);
                if (dataItemPos >= 0) {
                  dataItem.splice(dataItemPos, 1);
                }
              }
            }
          }
        } else {
          delete data[removeItem];
        }
      }
    }
    return data;
  }

  private applyVariables(data): any {
    if (data && data.variables) {
      this.applyJsonVariables(data, data.variables);
    }
    return data;
  }
  private applyJsonVariables(data, variables: any): any {
    if (this.isJSON(data)) {
      for (const key in data) {
        if (this.isJSON(data[key])) {
          this.applyJsonVariables(data[key], variables);
        } else if (Array.isArray(data[key])) {
          for (const item of data[key]) {
            this.applyJsonVariables(item, variables);
          }
        } else if (isString(data[key]) && data[key].startsWith("@")) {
          if (variables[data[key]]) {
            data[key] = variables[data[key]];
          }
        }
      }
    }
    return data;
  }

  private applyJsonImports(data, importedData: any[]): any {
    if (this.isJSON(data)) {
      for (const key in data) {
        if (this.isJSON(data[key])) {
          this.applyJsonImports(data[key], importedData);
        } else if (Array.isArray(data[key])) {
          let index = 0;
          for (const item of data[key]) {
            if (isString(item) && item.startsWith("$$")) {
              data[key][index] = this.applyImportValue(item, importedData);
            } else {
              this.applyJsonImports(item, importedData);
            }
            index++;
          }
        } else if (isString(data[key]) && data[key].startsWith("$$")) {
          data[key] = this.applyImportValue(data[key], importedData);
        }
      }
    }
    return data;
  }

  private applyImportValue(expr: string, importedData: any[]) {
    for (const importItem of importedData) {
      const itemKey = expr.substr(0, expr.indexOf("."));
      if (importItem.key === itemKey) {
        return importItem.data[expr.replace(itemKey + ".", "")];
      }
    }
    return expr;
  }

  private applyJsonExtends(parentData, data): any {
    this.applyRemoves(parentData, data.removeItems);

    let result = null;
    if (this.isJSON(data)) {
      result = {};
      if (this.isJSON(parentData)) {
        for (const key in parentData) {
          if (this.isJSON(parentData[key]) || Array.isArray(parentData[key])) {
            result[key] = this.cloneJSON(parentData[key]);
          } else {
            result[key] = parentData[key];
          }
        }
      }

      for (const key in data) {
        if (this.isJSON(data[key]) || Array.isArray(data[key])) {
          result[key] = this.applyJsonExtends(result[key], data[key]);
        } else {
          result[key] = data[key];
        }
      }
    } else if (Array.isArray(parentData) && Array.isArray(data)) {
      result = parentData;

      for (let i = 0; i < data.length; i++) {
        if (result.indexOf(data[i]) === -1) {
          result[result.length] = data[i];
        }
      }
    } else {
      result = data;
    }

    return result;
  }
}
