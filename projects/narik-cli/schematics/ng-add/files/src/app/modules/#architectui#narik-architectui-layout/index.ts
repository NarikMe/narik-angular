import { Provider } from '@angular/core';
import { FooterComponent } from './Components/footer/footer.component';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { PageTitleComponent } from './Components/page-title/page-title.component';
import { HeaderComponent } from './Components/header/header.component';
import { UserBoxComponent } from './Components/header/elements/user-box/user-box.component';
import { SearchBoxComponent } from './Components/header/elements/search-box/search-box.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

export const COMPONENTS: Provider[] = [
    FooterComponent,
    BaseLayoutComponent,
    SearchBoxComponent,
    UserBoxComponent,
    HeaderComponent,
    PageTitleComponent,
    SidebarComponent,
    PagesLayoutComponent,
];
