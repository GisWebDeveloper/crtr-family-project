import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormPersonComponent} from "./form-person/form-person.component";
import {FormKandasPersonComponent} from "./form-kandas-person/form-kandas-person.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'need-actions',
            }, {
                path: 'person/:iin',
                component: FormPersonComponent
            }, {
                path: 'kandasPerson/:iin',
                component: FormKandasPersonComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {
}
