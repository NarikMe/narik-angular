import { NarikCommonModule } from '@narik/common';
import {
  MetaDataService,
  ViewManagerService,
  EntityTypeService,
} from '@narik/infrastructure';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import {
  COMPONENTS,
  ENTRY_COMPONENTS,
  EXPORT_COMPONENTS,
} from './components/index';
import { DIRECTIVES, EXPORT_DIRECTIVES } from './directives/index';
import { NarikAppCoreModuleConfig } from './interfaces/narik-app-core-module.config';
import {
  NarikViewComponentNameResolver,
  ViewComponentNameResolver,
} from './interfaces/view-component-name-resolver';
import { NarikMetaDataService } from './services/narik-meta-data.service';
import { NarikViewManager } from './services/narik-view-manager.service';
import { ModuleLoadCompletelyGuard } from './util/module-load-completely.guard';
import { NarikRouteReuseStrategy } from './util/narik-route-reuse-strategy';
import { UserIsAuthenticatedGuard } from './util/user-is-authenticated.guard';
import { UserIsAuthorizedGuard } from './util/user-is-authorized.guard';
import { QUERY_SERVICE_TYPE } from './internal-injectionTokens';
import { NarikQueryService } from './services/narik-query.service';
import { QueryService } from './services/queryService';
import { NarikEntityTypeService } from './services/narik-entity-type.service';

@NgModule({
  imports: [CommonModule, NarikCommonModule],
  declarations: [COMPONENTS, DIRECTIVES],
  exports: [EXPORT_COMPONENTS, EXPORT_DIRECTIVES],
  providers: [],
  entryComponents: [ENTRY_COMPONENTS],
})
export class NarikAppCoreModule {
  static forRoot(
    config?: NarikAppCoreModuleConfig
  ): ModuleWithProviders<NarikAppCoreModule> {
    return {
      ngModule: NarikAppCoreModule,
      providers: [
        {
          provide: MetaDataService,
          useClass: (config && config.metaDataService) || NarikMetaDataService,
        },
        {
          provide: ViewManagerService,
          useClass: (config && config.viewManagerService) || NarikViewManager,
        },
        {
          provide: QueryService,
          useClass: (config && config.queryService) || NarikQueryService,
        },
        {
          provide: ViewComponentNameResolver,
          useClass:
            (config && config.viewComponentNameResolver) ||
            NarikViewComponentNameResolver,
        },
        { provide: RouteReuseStrategy, useClass: NarikRouteReuseStrategy },
        {
          provide: QUERY_SERVICE_TYPE,
          useValue: (config && config.queryService) || NarikQueryService,
        },
        {
          provide: EntityTypeService,
          useClass:
            (config && config.entityTypeService) || NarikEntityTypeService,
        },
        ModuleLoadCompletelyGuard,
        UserIsAuthenticatedGuard,
        UserIsAuthorizedGuard,
      ],
    };
  }
}
