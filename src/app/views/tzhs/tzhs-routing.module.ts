import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TzhsPageComponent } from './tzhs-page/tzhs-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tzhs',
    },
    {
        path: 'tzhs',
        component: TzhsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TzhsRoutingModule {}
