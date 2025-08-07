import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileExportRoutingModule} from "./file-export-routing.module";
import {FileExportComponent} from "./file-export.component";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    SpinnerModule,
    UtilitiesModule
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {TranslateModule} from "@ngx-translate/core";
import {NgxDropzoneModule} from "ngx-dropzone";


@NgModule({
    declarations: [
        FileExportComponent
  ],
    imports: [
        FileExportRoutingModule,
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CommonModule,
        FormModule,
        FormsModule,
        GridModule,
        IconModule,
        NgSelectModule,
        NgxDropzoneModule,
        SpinnerModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class FileExportModule {
}
