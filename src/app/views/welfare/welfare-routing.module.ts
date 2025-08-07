import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelfareHistoryComponent} from "./welfare-history/welfare-history.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'history',
            }, {
                path: 'history',
                component: WelfareHistoryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WelfareRoutingModule {
}
