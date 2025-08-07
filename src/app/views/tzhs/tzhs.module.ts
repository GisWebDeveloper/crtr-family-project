import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AlertModule,
    ButtonGroupModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule, FormModule, GridModule, ModalModule,
    NavModule, TableModule, TabsModule, UtilitiesModule
} from "@coreui/angular";
import {FcSharedModule} from "../fc-shared.module";
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TranslateModule} from "@ngx-translate/core";
import {TzhsRoutingModule} from "./tzhs-routing.module";
import { TzhsPageComponent } from './tzhs-page/tzhs-page.component';

@NgModule({
  declarations: [
    TzhsPageComponent
  ],
  imports: [
      AlertModule,
      ButtonModule,
      ButtonGroupModule,
      CalloutModule,
      CardModule,
      CollapseModule,
      CommonModule,
      NavModule,
      TabsModule,
      GridModule,
      FcSharedModule,
      FormModule,
      FormsModule,
      IconModule,
      ModalModule,
      NgSelectModule,
      PaginationModule.forRoot(),
      TzhsRoutingModule,
      TableModule,
      TranslateModule.forChild({
          extend: true
      }),
      UtilitiesModule,
  ]
})
export class TzhsModule { }
