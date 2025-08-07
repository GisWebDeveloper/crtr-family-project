import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NeedActionsComponent} from "../need-actions/need-actions.component";
import {SocialRisksComponent} from "../social-risks/social-risks.component";
import {KandasComponent} from "../kandas/kandas.component";
import {KandasStatisticsComponent} from "../kandas/kandas-statistics/kandas-statistics.component";
import {KandasFormComponent} from "../kandas/kandas-form/kandas-form.component";
import {KandasNewStatisticsComponent} from "../kandas/kandas-new-statistics/kandas-new-statistics.component";
import {KandasFormNewComponent} from "../kandas/kandas-form-new/kandas-form-new.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'need-actions'
            }, {
                path: 'need-actions',
                component: NeedActionsComponent
            }, {
                path: 'social-risks',
                component: SocialRisksComponent
            }, {
                path: 'kandas',
                component: KandasComponent
            }, {
                path: 'kandas/stat',
                component: KandasStatisticsComponent
            }, {
                path: 'kandas/statNew',
                component: KandasNewStatisticsComponent
            }, {
                path: 'kandas/form',
                component: KandasFormComponent
            }, {
                path: 'kandas/formNew',
                component: KandasFormNewComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NeedRoutingModule {
}
