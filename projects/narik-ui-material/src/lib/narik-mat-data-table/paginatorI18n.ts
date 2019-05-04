import { MatPaginatorIntl } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

export class PaginatorI18n {
  constructor(private readonly translate: TranslateService) {}

  getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = this.translate.instant(
      "ITEMS_PER_PAGE_LABEL"
    );
    paginatorIntl.nextPageLabel = this.translate.instant("NEXT_PAGE_LABEL");
    paginatorIntl.previousPageLabel = this.translate.instant(
      "PREVIOUS_PAGE_LABEL"
    );
    paginatorIntl.firstPageLabel = this.translate.instant("FIRST_PAGE_LABEL");
    paginatorIntl.lastPageLabel = this.translate.instant("LAST_PAGE_LABEL");
    paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    return paginatorIntl;
  }

  private getRangeLabel(
    page: number,
    pageSize: number,
    length: number
  ): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant("RANGE_PAGE_LABEL_1", { length });
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return this.translate.instant("RANGE_PAGE_LABEL_2", {
      startIndex: startIndex + 1,
      endIndex,
      length
    });
  }
}
