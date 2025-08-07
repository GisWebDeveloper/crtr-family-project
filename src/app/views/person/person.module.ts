import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonComponent} from './person.component';
import {PersonRoutingModule} from "./person-routing.module";
import {
    AlertModule,
    BadgeModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule,
    FormModule,
    GridModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {TranslateModule} from "@ngx-translate/core";
import {PersonSharedModule} from "./person-shared.module";
import {PersonTimelineComponent} from "./person-timeline/person-timeline.component";
import {PersonSearchComponent} from "./person-search/person-search.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        PersonComponent,
        PersonSearchComponent,
        PersonTimelineComponent
    ],
    imports: [
        AlertModule,
        BadgeModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CollapseModule,
        CommonModule,
        GridModule,
        FormModule,
        FormsModule,
        IconModule,
        PaginationModule.forRoot(),
        PersonRoutingModule,
        PersonSharedModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
    ]
})
export class PersonModule {
}
