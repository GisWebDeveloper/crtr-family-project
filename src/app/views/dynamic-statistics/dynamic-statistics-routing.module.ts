import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DynamicStatMainComponent} from "./dynamic-stat-main/dynamic-stat-main.component";

const routes: Routes = [
    {
        path: '',
        component: DynamicStatMainComponent
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'main',
        //     }, {
        //         path: 'main',
        //         component: DynamicStatMainComponent
        //     }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DynamicStatisticsRoutingModule {
}
