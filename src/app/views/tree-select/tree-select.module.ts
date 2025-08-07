import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeSelectComponent} from './tree-select.component';
import {DropdownModule} from "@coreui/angular";

import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        TreeSelectComponent
    ],
    exports: [
        TreeSelectComponent
    ],
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule
    ]
})
export class TreeSelectModule {
}
