import {
  UrlCreator,
  UrlCreatorService,
  PagingParameters
} from "narik-infrastructure";

import { Inject, Injectable } from "@angular/core";

@Injectable()
export class NarikUrlCreatorService extends UrlCreatorService {
  private urlCreators = new Map<string, UrlCreator>();

  constructor(@Inject(UrlCreator) creators: UrlCreator[]) {
    super();
    creators.forEach(x => this.urlCreators.set(x.key, x));
  }
  applyParameters(key: string, url: string, parameters: any): string {
    const creator = this.urlCreators.get(key);
    return creator.applyParameters(url, parameters);
  }
  applyPagingParameters(
    key: string,
    url: string,
    pagingParameter: PagingParameters
  ): string {
    const creator = this.urlCreators.get(key);
    return creator.applyPagingParameters(url, pagingParameter);
  }
}
