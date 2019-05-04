import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { concat, forkJoin } from "rxjs";
import { ConfigService } from "narik-infrastructure";

export interface ResourceModel {
  src: string;
  loaded?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class NarikResourceLoaderService {
  private resources: ResourceModel[] = [];
  private dynamicResourcesPath = "";

  constructor(configService: ConfigService) {
    this.dynamicResourcesPath = configService.getConfig("dynamicResourcesPath");
    if (this.dynamicResourcesPath) {
      this.dynamicResourcesPath += "/";
    }
  }

  public load(
    items: (ResourceModel | ResourceModel[])[]
  ): Observable<ResourceModel[]> {
    const loaders = items.map(x => {
      if (Array.isArray(x)) {
        return Observable.create(o => {
          const allloaders = x.map(t => this.loadInternall(t));
          concat(...allloaders).subscribe(
            t => {},
            () => {},
            () => {
              o.next();
              o.complete();
            }
          );
        });
      } else {
        return this.loadInternall(x);
      }
    });
    return Observable.create(observer => {
      forkJoin(loaders).subscribe(results => {
        observer.next(results);
      });
    });
  }

  private loadInternall(resource: ResourceModel): Observable<ResourceModel> {
    return new Observable<ResourceModel>(
      (observer: Observer<ResourceModel>) => {
        const existingResources = this.resources.find(
          s => s.src === resource.src
        );

        // Complete if already loaded
        if (existingResources && existingResources.loaded) {
          observer.next(existingResources);
          observer.complete();
        } else {
          // Add the script
          this.resources = [...this.resources, resource];

          if (resource.src.toLowerCase().endsWith(".js")) {
            const scriptElement = document.createElement("script");
            scriptElement.type = "text/javascript";
            scriptElement.src = this.dynamicResourcesPath + resource.src;

            scriptElement.onload = () => {
              resource.loaded = true;
              observer.next(resource);
              observer.complete();
            };

            scriptElement.onerror = (error: any) => {
              observer.error("Couldn't load script " + resource.src);
            };

            document.getElementsByTagName("body")[0].appendChild(scriptElement);
          } else {
            const cssElement = document.createElement("link");
            cssElement.rel = "stylesheet";
            cssElement.href = this.dynamicResourcesPath + resource.src;

            cssElement.onload = () => {
              resource.loaded = true;
              observer.next(resource);
              observer.complete();
            };

            cssElement.onerror = (error: any) => {
              observer.error("Couldn't load style " + resource.src);
            };

            document.getElementsByTagName("head")[0].appendChild(cssElement);
          }
        }
      }
    );
  }
}
