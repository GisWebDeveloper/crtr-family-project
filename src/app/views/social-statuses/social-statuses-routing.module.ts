import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocialStatusesComponent} from "./social-statuses.component";

const routes: Routes = [
    {
        path: '',
        component: SocialStatusesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SocialStatusesRoutingModule {
}
