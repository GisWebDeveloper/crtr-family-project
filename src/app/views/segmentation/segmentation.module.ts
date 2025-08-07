import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SegmentationFcComponent} from './segmentation-fc/segmentation-fc.component';
import {SegmentationRoutingModule} from "./segmentation-routing.module";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {TranslateModule} from "@ngx-translate/core";
import {IconModule} from "@coreui/icons-angular";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {SegmentationListModalComponent} from './segmentation-list-modal/segmentation-list-modal.component';
import {PaginationModule} from "ngx-bootstrap/pagination";


@NgModule({
    declarations: [
        SegmentationFcComponent,
        SegmentationListModalComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CommonModule,
        FormModule,
        FormsModule,
        GridModule,
        IconModule,
        ModalModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        SegmentationRoutingModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class SegmentationModule {
}
