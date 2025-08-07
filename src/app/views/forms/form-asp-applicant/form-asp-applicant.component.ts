import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {CountMember} from "../../../models/count/count-member";
import {CountMemberAction} from "../../../models/count/count-member-action";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {WorkspaceService} from "../../../services/workspace.service";
import {CountRequest} from "../../../models/count/count-request";

@Component({
  selector: 'app-form-asp-applicant',
  templateUrl: './form-asp-applicant.component.html',
  styleUrls: ['./form-asp-applicant.component.scss']
})
export class FormAspApplicantComponent implements OnInit {

    @Input() hasAdminPermissions: boolean;
    @Input() showFormNeedActions: EventEmitter<string>;

    iin: string;
    countMemberList: Array<CountMember>;
    countMemberActionList: Array<CountMemberAction>;

    dictionaryYesNo: Array<Dictionary>;
    dictionaryCountActionYes: Array<Dictionary>;
    dictionaryCountActionNo: Array<Dictionary>;

    disableButtonSave = false;

    constructor(
        private dictionaryService: DictionaryService,
        public translateService: TranslateService,
        public utilService: UtilService,
        private workspaceService: WorkspaceService) {
    }

    ngOnInit(): void {
        this.initDictionaries();
        this.countMemberList = new Array<CountMember>();
        this.countMemberActionList = new Array<CountMemberAction>();
        this.showFormNeedActions.asObservable().subscribe(iinValue => {
            this.iin = iinValue;
            this.initPersonCountActions(iinValue);
        });
    }

    private initDictionaries() {
        const dictionaryCA = this.dictionaryService.getDictionaryCountAspApplicant();

        this.dictionaryYesNo = this.dictionaryService.getYesNoDictionary();
        this.dictionaryCountActionYes = dictionaryCA.filter(dc => dc.code.startsWith('Y'));
        this.dictionaryCountActionNo = dictionaryCA.filter(dc => dc.code.startsWith('N'));

    }

    private initPersonCountActions(iin: string) {

        let request = new CountRequest();
        request.iin = iin;
        request.countCode = 'S01020';
        this.workspaceService.getPersonCountActions(request).subscribe({
            next: response => {

                this.countMemberList = response.countMemberList;
                this.countMemberActionList = response.countMemberActionList;

                this.disableButtonSave = true;
                this.countMemberList.forEach(value => {
                    if (value.countDictionary.id!==126){
                        this.disableButtonSave = false;
                    }
                });

                this.countMemberActionList.forEach(action => {
                    const cm = this.countMemberList.find(cmi => cmi.countDictionary.code == action.countDictionary.code && cmi.iin == action.iin);
                    if (cm && action.actionCode) cm.isConfirmation = action.actionCode.startsWith('Y') ? '1' : '0';
                });

            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    getCountDictionaryName(countCode: string, actionCode?: string) {

        let name = actionCode;
        let dictionaryCount: Dictionary[];
        dictionaryCount = this.dictionaryCountActionYes.concat(this.dictionaryCountActionNo);
        const cd = dictionaryCount.find(item => item.code == actionCode);
        if (cd) name = cd.nameRu;
        return name;
    }

    saveCountMemberAction() {
        const emptyCM = this.countMemberList.find(cm => cm.isConfirmation && !cm.actionCode);
        if (emptyCM) {
            this.utilService.notifyError('Выберите причину!');
        } else {
            let request = new CountRequest();
            request.countMemberList = this.countMemberList;
            this.workspaceService.savePersonCountActions(request).subscribe(() => {
                this.initPersonCountActions(this.iin);
            });
        }
    }

    getConfirmationTextByCode(code?:string){
        return code?.startsWith('Y') ? this.translateService.currentLang === 'kz' ? 'ИӘ' : 'ДА' : this.translateService.currentLang === 'kz' ? 'ЖОҚ' : 'НЕТ';
    }

}
