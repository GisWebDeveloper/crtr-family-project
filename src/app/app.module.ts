import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import {AppRoutingModule} from './app-routing.module';

// Import app component
import {AppComponent} from './app.component';

// Import containers
import {DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent,} from './containers';

import {
    AlertModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    PopoverModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    TooltipModule,
    UtilitiesModule,
} from '@coreui/angular';

import {IconModule, IconSetService} from '@coreui/icons-angular';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateModuleConfig} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoginComponent} from './views/login/login.component';
import {NotifierModule, NotifierOptions} from "angular-notifier";
import {HTTP_INTERCEPTORS_PROVIDERS} from "./http-interceptors";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PersonSharedModule} from "./views/person/person-shared.module";
import {UserRoleService} from "./services/user-role.service";
import {DataService} from "./services/data.service";
import {AuthGuard} from "./guards/auth.guard";
import {UnauthorizedComponent} from "./views/unauthorized/unauthorized.component";
import {NotFoundComponent} from "./views/not-found/not-found.component";
import {IinSearchGuard} from "./guards/iin-search.guard";
import {ProfileComponent} from "./views/profile/profile.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};

const APP_CONTAINERS = [
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent,
];

const TRANSLATE_CONFIG: TranslateModuleConfig = {
    loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory
    }
};

const NOTIFIER_OPTIONS: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right'
        }
    },
    behaviour: {
        stacking: 5
    }
};

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        LoginComponent,
        UnauthorizedComponent,
        NotFoundComponent,
        ProfileComponent
    ],
    imports: [
        AlertModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AvatarModule,
        BreadcrumbModule,
        FooterModule,
        DropdownModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        IconModule,
        PerfectScrollbarModule,
        NavModule,
        ButtonModule,
        FormModule,
        UtilitiesModule,
        ButtonGroupModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        TabsModule,
        ListGroupModule,
        ProgressModule,
        BadgeModule,
        ListGroupModule,
        CardModule,
        HttpClientModule,
        FormsModule,
        PersonSharedModule,
        TooltipModule,
        PopoverModule,
        CommonModule,
        PaginationModule.forRoot(),
        NotifierModule.withConfig(NOTIFIER_OPTIONS),
        TranslateModule.forRoot(TRANSLATE_CONFIG)
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        }, {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        AuthGuard,
        IinSearchGuard,
        HTTP_INTERCEPTORS_PROVIDERS,
        IconSetService,
        DataService,
        UserRoleService,
        Title,
        DatePipe
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
