import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PersonGeneralInfoComponent} from "./person-portrait/person-general-info/person-general-info.component";
import {TranslateModule} from "@ngx-translate/core";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule,
    FormModule,
    GridModule,
    ModalModule,
    SpinnerModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {PhonePipe} from "../../pipes/phone.pipe";
import {
    PersonAgriculturalMachineryComponent
} from "./person-portrait/person-agricultural-machinery/person-agricultural-machinery.component";
import {PersonAlimonyComponent} from "./person-portrait/person-alimony/person-alimony.component";
import {PersonEducationComponent} from "./person-portrait/person-education/person-education.component";
import {PersonEmploymentComponent} from "./person-portrait/person-employment/person-employment.component";
import {PersonFarmAnimalComponent} from "./person-portrait/person-farm-animal/person-farm-animal.component";
import {PersonGovMeasureComponent} from "./person-portrait/person-gov-measure/person-gov-measure.component";
import {PersonHrComponent} from "./person-portrait/person-hr/person-hr.component";
import {PersonIncomeComponent} from "./person-portrait/person-income/person-income.component";
import {
    PersonIndividualEntrepreneurComponent
} from "./person-portrait/person-individual-entrepreneur/person-individual-entrepreneur.component";
import {PersonLandComponent} from "./person-portrait/person-land/person-land.component";
import {PersonLegalEntityComponent} from "./person-portrait/person-legal-entity/person-legal-entity.component";
import {
    PersonMedicalAttachmentComponent
} from "./person-portrait/person-medical-attachment/person-medical-attachment.component";
import {
    PersonMilitaryActionsComponent
} from "./person-portrait/person-military-actions/person-military-actions.component";
import {PersonPortraitComponent} from "./person-portrait/person-portrait.component";
import {PersonRealEstateComponent} from "./person-portrait/person-real-estate/person-real-estate.component";
import {PersonSkillComponent} from "./person-portrait/person-skill/person-skill.component";
import {PersonSocialPaymentComponent} from "./person-portrait/person-social-payment/person-social-payment.component";
import {PersonSocialStatusComponent} from "./person-portrait/person-social-status/person-social-status.component";
import {PersonTransportComponent} from "./person-portrait/person-transport/person-transport.component";
import {IconModule} from "@coreui/icons-angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {
    PersonRegAddressModalComponent
} from "./person-portrait/person-reg-address-modal/person-reg-address-modal.component";
import {PersonMeriIparComponent} from "./person-portrait/person-meri-ipar/person-meri-ipar.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PersonRegAddressHistoryModalComponent} from "./person-portrait/person-reg-address-history-modal/person-reg-address-history-modal.component";
import {BirCalculationModalComponent} from "./person-portrait/bir-calculation-modal/bir-calculation-modal.component";
import {PersonTaxComponent} from "./person-portrait/person-tax/person-tax.component";

@NgModule({
    declarations: [
        PersonAgriculturalMachineryComponent,
        PersonAlimonyComponent,
        PersonEducationComponent,
        PersonEmploymentComponent,
        PersonFarmAnimalComponent,
        PersonGeneralInfoComponent,
        PersonGovMeasureComponent,
        PersonHrComponent,
        PersonIncomeComponent,
        PersonIndividualEntrepreneurComponent,
        PersonLandComponent,
        PersonLegalEntityComponent,
        PersonMedicalAttachmentComponent,
        PersonMilitaryActionsComponent,
        PersonPortraitComponent,
        PersonRealEstateComponent,
        PersonRegAddressModalComponent,
        PersonRegAddressHistoryModalComponent,
        PersonSkillComponent,
        PersonSocialPaymentComponent,
        PersonSocialStatusComponent,
        PersonTransportComponent,
        PhonePipe,
        PersonMeriIparComponent,
        BirCalculationModalComponent,
        PersonTaxComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CollapseModule,
        CommonModule,
        GridModule,
        FormModule,
        FormsModule,
        IconModule,
        ModalModule,
        RouterModule,
        SpinnerModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        PaginationModule
    ],
    exports: [
        PersonAgriculturalMachineryComponent,
        PersonAlimonyComponent,
        PersonEducationComponent,
        PersonEmploymentComponent,
        PersonFarmAnimalComponent,
        PersonGeneralInfoComponent,
        PersonGovMeasureComponent,
        PersonHrComponent,
        PersonIncomeComponent,
        PersonIndividualEntrepreneurComponent,
        PersonLandComponent,
        PersonLegalEntityComponent,
        PersonMedicalAttachmentComponent,
        PersonMilitaryActionsComponent,
        PersonPortraitComponent,
        PersonRealEstateComponent,
        PersonSkillComponent,
        PersonSocialPaymentComponent,
        PersonSocialStatusComponent,
        PersonTransportComponent,
        PhonePipe,
        PersonMeriIparComponent
    ],
    providers: []
})
export class PersonSharedModule {
}
