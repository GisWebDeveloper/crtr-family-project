import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SegmentationNewFcComponent} from "./segmentation-new-fc/segmentation-new-fc.component";

const routes: Routes = [
    {
        path: '',
        component: SegmentationNewFcComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SegmentationNewRoutingModule {
}
