import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AspComponent} from "./asp/asp.component";

const routes: Routes = [
    {
        path: '',
        component: AspComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AspRoutingModule {
}
