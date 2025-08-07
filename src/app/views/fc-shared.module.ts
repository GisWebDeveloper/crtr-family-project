import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatTotalFilterPipe} from "../pipes/stat-total-filter.pipe";

@NgModule({
    declarations: [
        StatTotalFilterPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        StatTotalFilterPipe
    ]
})
export class FcSharedModule {
}
