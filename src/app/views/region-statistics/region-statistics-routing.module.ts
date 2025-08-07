import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegionStatisticsComponent} from "./region-statistics.component";

const routes: Routes = [
    {
        path: '',
        component: RegionStatisticsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegionStatisticsRoutingModule { }
