import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NeedActionsComponent} from "../need-actions/need-actions.component";
import {SocialRisksComponent} from "../social-risks/social-risks.component";
import {KandasComponent} from "../kandas/kandas.component";
import {KandasStatisticsComponent} from "../kandas/kandas-statistics/kandas-statistics.component";
import {KandasNewStatisticsComponent} from "../kandas/kandas-new-statistics/kandas-new-statistics.component";
import {KandasFormComponent} from "../kandas/kandas-form/kandas-form.component";
import {KandasFormNewComponent} from "../kandas/kandas-form-new/kandas-form-new.component";
import {NecessityComponent} from "./necessity.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'necessity'
            }, {
                path: 'necessity',
                component: NecessityComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NecessityRoutingModule { }
