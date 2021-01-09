import { NgModule } from '@angular/core';

import { COMPONENTS } from './index';

import { RouterModule } from '@angular/router';

import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    NgReduxModule,
    NgRedux,
    DevToolsExtension,
} from '@angular-redux/store';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { ArchitectUIState, rootReducer } from './ThemeOptions/store';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};

@NgModule({
    imports: [
        RouterModule,
        PerfectScrollbarModule,
        TranslateModule,
        NgbModule,
        LoadingBarRouterModule,
        NgReduxModule,
        AngularFontAwesomeModule,
    ],

    declarations: [COMPONENTS],
    exports: [COMPONENTS],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        ConfigActions,
    ],
})
export class NarikArchitectUiLayout {
    constructor(
        private ngRedux: NgRedux<ArchitectUIState>,
        devTool: DevToolsExtension
    ) {
        this.ngRedux.configureStore(
            rootReducer,
            {} as ArchitectUIState,
            [],
            [devTool.isEnabled() ? devTool.enhancer() : (f) => f]
        );
    }
}
