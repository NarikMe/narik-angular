import { formatString, isString, isObject } from "narik-common";
import { UrlCreator, PagingParameters } from "narik-infrastructure";
import { Injectable } from "@angular/core";

@Injectable()
export class ODataUrlCreator extends UrlCreator {
  key = "odata";

  odataFilters = {
    eq: "eq",
    neq: "ne",
    gt: "gt",
    gte: "ge",
    lt: "lt",
    lte: "le",
    contains: "contains",
    doesnotcontain: "substringof",
    endswith: "endswith",
    startswith: "startswith",
    isnull: "eq",
    isnotnull: "ne",
    isnullorempty: "eq",
    isnotnullorempty: "ne",
    isempty: "eq",
    isnotempty: "ne"
  };
  applyParameters(url: string, parameters: any): string {
    if (!parameters) {
      return url;
    }
    if (isObject(parameters)) {
      return formatString(
        "{0}({1})",
        url,
        Object.keys(parameters)
          .map(x => {
            return formatString(
              "{0}={2}{1}{2}",
              x,
              parameters[x],
              isString(parameters[x]) ? "'" : ""
            );
          })
          .join(",")
      );
    } else {
      return formatString(
        "{0}({2}{1}{2})",
        url,
        parameters,
        isString(parameters) ? "'" : ""
      );
    }
  }

  applyPagingParameters(
    url: string,
    pagingParameter: PagingParameters
  ): string {
    if (!pagingParameter) {
      return url;
    }
    let orderBy = "";
    if (pagingParameter.sort && pagingParameter.sort.length !== 0) {
      orderBy = `&%24orderby=`;
      orderBy += pagingParameter.sort
        .map(s => {
          return `${s.field}${s.order === "desc" ? " desc" : ""}`;
        })
        .join(",");
    }
    let filter = "";
    if (pagingParameter.filter && pagingParameter.filter.filters) {
      filter = `&%24filter=${this.toOdataFilter(pagingParameter.filter)}`;
    }
    pagingParameter.skip =
      pagingParameter.skip ||
      pagingParameter.pageIndex * pagingParameter.pageCount;
    return (
      url +
      `?%24format=json&%24top=${pagingParameter.pageCount}&%24skip=${
        pagingParameter.skip
      }${orderBy}${filter}&%24count=true`
    );
  }

  private toOdataFilter(filter) {
    const result = [],
      condition = filter.condition || "and";
    let idx, length, field, type, format, operator, value, ignoreCase;
    const filters = filter.filters;

    for (idx = 0, length = filters.length; idx < length; idx++) {
      filter = filters[idx];
      field = filter.field;
      value = filter.value;
      operator = filter.operator;

      if (filter.filters) {
        filter = this.toOdataFilter(filter);
      } else {
        ignoreCase = filter.ignoreCase;
        field = field.replace(/\./g, "/");
        filter = this.odataFilters[operator];

        if (operator === "isnullorempty") {
          filter = formatString("{0} {1} null or {0} {1} ''", field, filter);
        } else if (operator === "isnotnullorempty") {
          filter = formatString("{0} {1} null and {0} {1} ''", field, filter);
        } else if (operator === "isnull" || operator === "isnotnull") {
          filter = formatString("{0} {1} null", field, filter);
        } else if (operator === "isempty" || operator === "isnotempty") {
          filter = formatString("{0} {1} ''", field, filter);
        } else if (filter && value !== undefined) {
          type = typeof value;
          if (type === "string") {
            format = "'{1}'";
            value = value.replace(/'/g, "''");

            if (ignoreCase === true) {
              field = "tolower(" + field + ")";
            }
          } else if (type === "date") {
            format = "{1:yyyy-MM-ddTHH:mm:ss+00:00}";
            // value = kendo.timezone.apply(value, "Etc/UTC");
          } else {
            format = "{1}";
          }

          if (filter.length > 3) {
            if (filter !== "substringof") {
              format = "{0}({2}," + format + ")";
            } else {
              format = "{0}(" + format + ",{2})";
              if (operator === "doesnotcontain") {
                format = "{0}({2},'{1}') eq -1";
                filter = "indexof";
              }
            }
          } else {
            format = "{2} {0} " + format;
          }

          filter = formatString(format, filter, value, field);
        }
      }

      result.push(filter);
    }

    filter = result.join(" " + condition + " ");

    if (result.length > 1) {
      filter = "(" + filter + ")";
    }

    return filter;
  }
}
