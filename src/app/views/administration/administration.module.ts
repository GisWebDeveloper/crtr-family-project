import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationRoutingModule} from "./administration-routing.module";
import {AdministrationAppItemsComponent} from './administration-app-items/administration-app-items.component';
import {
    AlertModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {TranslateModule} from "@ngx-translate/core";
import {IconModule} from "@coreui/icons-angular";
import {AppItemsModalComponent} from './app-items-modal/app-items-modal.component';
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {AdministrationActionLogComponent} from './administration-action-log/administration-action-log.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import { DatabaseUpdateComponent } from './database-update/database-update.component';
import { DatabaseUpdateLogModalComponent } from './database-update-log-modal/database-update-log-modal.component';


@NgModule({
    declarations: [
        AdministrationActionLogComponent,
        AdministrationAppItemsComponent,
        AppItemsModalComponent,
        DatabaseUpdateComponent,
        DatabaseUpdateLogModalComponent,
    ],
    imports: [
        AdministrationRoutingModule,
        AlertModule,
        ButtonModule,
        CardModule,
        CommonModule,
        FormModule,
        FormsModule,
        IconModule,
        GridModule,
        ModalModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class AdministrationModule {
}
