import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatMainComponent} from "./stat-main/stat-main.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'main',
            }, {
                path: 'main',
                component: StatMainComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
