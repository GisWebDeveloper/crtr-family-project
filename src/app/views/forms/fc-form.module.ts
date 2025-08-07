import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormRoutingModule} from "./form-routing.module";
import {FormNeedActionsComponent} from './form-need-actions/form-need-actions.component';
import {PersonSharedModule} from "../person/person-shared.module";
import {
    ButtonModule,
    CardModule,
    FormModule,
    GridModule, NavModule,
    TableModule,
    TabsModule,
    UtilitiesModule
} from "@coreui/angular";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {IconModule} from "@coreui/icons-angular";
import {FormPersonComponent} from './form-person/form-person.component';
import {FormMonComponent} from './form-mon/form-mon.component';
import {FormMfComponent} from './form-mf/form-mf.component';
import { FormMiorComponent } from './form-mior/form-mior.component';
import { FormMzComponent } from './form-mz/form-mz.component';
import { FormAspApplicantComponent } from './form-asp-applicant/form-asp-applicant.component';
import { FormKandasPersonComponent } from './form-kandas-person/form-kandas-person.component';
import { FormKandasComponent } from './form-kandas/form-kandas.component';
import { FormPereselentsyComponent } from './form-pereselentsy/form-pereselentsy.component';
import { FormSusnComponent } from './form-susn/form-susn.component';
import { FormXCategoryComponent } from './form-x-category/form-x-category.component';
import { FormDCategoryComponent } from './form-d-category/form-d-category.component';
import { FormECategoryComponent } from './form-e-category/form-e-category.component';


@NgModule({
    declarations: [
        FormMfComponent,
        FormMonComponent,
        FormNeedActionsComponent,
        FormPersonComponent,
        FormMiorComponent,
        FormMzComponent,
        FormAspApplicantComponent,
        FormKandasPersonComponent,
        FormKandasComponent,
        FormPereselentsyComponent,
        FormSusnComponent,
        FormXCategoryComponent,
        FormDCategoryComponent,
        FormECategoryComponent,
    ],
    imports: [
        ButtonModule,
        CardModule,
        CommonModule,
        FormModule,
        FormsModule,
        FormRoutingModule,
        GridModule,
        IconModule,
        NgSelectModule,
        PersonSharedModule,
        TableModule,
        TabsModule,
        NavModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class FcFormModule {
}
