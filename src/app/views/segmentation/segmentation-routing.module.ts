import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SegmentationFcComponent} from "./segmentation-fc/segmentation-fc.component";

const routes: Routes = [
    {
        path: '',
        component: SegmentationFcComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SegmentationRoutingModule {
}
