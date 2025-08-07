import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NeedRoutingModule} from "./need-routing.module";
import {SocialRisksModule} from "../social-risks/social-risks.module";
import {NeedActionsModule} from "../need-actions/need-actions.module";
import {KandasModule} from "../kandas/kandas.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NeedRoutingModule,
        SocialRisksModule,
        NeedActionsModule,
        KandasModule
    ]
})
export class NeedModule {
}
