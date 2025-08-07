import {NgModule} from "@angular/core";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    ModalModule, TableModule, UtilitiesModule
} from "@coreui/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TranslateModule} from "@ngx-translate/core";
import {SegmentationNewFcComponent} from "./segmentation-new-fc/segmentation-new-fc.component";
import {SegmentationNewRoutingModule} from "./segmentation-new-routing.module";
import { SegmentationNewListModalComponent } from './segmentation-new-list-modal/segmentation-new-list-modal.component';

@NgModule({
    declarations: [
        SegmentationNewFcComponent,
        SegmentationNewListModalComponent
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
        SegmentationNewRoutingModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class SegmentationNewModule {
}
