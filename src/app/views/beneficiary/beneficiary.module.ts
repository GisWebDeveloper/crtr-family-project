import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BeneficiaryComponent} from "./beneficiary.component";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule,
    FormModule,
    GridModule, ModalModule, TableModule, UtilitiesModule
} from "@coreui/angular";
import {FamilyRoutingModule} from "../family/family-routing.module";
import {IconModule} from "@coreui/icons-angular";
import {PersonSharedModule} from "../person/person-shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgChartsModule} from "ng2-charts";
import {ChartjsModule} from "@coreui/angular-chartjs";
import {BeneficiaryRoutingModule} from "./beneficiary-routing.module";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
      BeneficiaryComponent
  ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CollapseModule,
        CommonModule,
        GridModule,
        FormModule,
        FormsModule,
        IconModule,
        PersonSharedModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        NgChartsModule,
        ChartjsModule,
        ModalModule,
        BeneficiaryRoutingModule,
        PaginationModule
    ]
})
export class BeneficiaryModule { }
