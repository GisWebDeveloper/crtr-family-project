import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {WorkspaceService} from "../../../services/workspace.service";
import {CountRequest} from "../../../models/count/count-request";
import {CountMember} from "../../../models/count/count-member";
import {CountMemberAction} from "../../../models/count/count-member-action";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-form-need-actions',
    templateUrl: './form-need-actions.component.html',
    styleUrls: ['./form-need-actions.component.scss']
})
export class FormNeedActionsComponent implements OnInit {

    @Input() hasAdminPermissions: boolean;
    @Input() showFormNeedActions: EventEmitter<string>;

    iin: string;
    countMemberList: Array<CountMember>;
    countMemberActionList: Array<CountMemberAction>;

    dictionaryYesNo: Array<Dictionary>;
    dictionaryCountActionYes: Array<Dictionary>;
    dictionaryCountActionNo: Array<Dictionary>;
    dictionaryCountActionAspYes: Array<Dictionary>;
    dictionaryCountActionAspNo: Array<Dictionary>;
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
        const dictionaryCA = this.dictionaryService.getDictionaryCountAction();
        const dictionaryCAAsp = this.dictionaryService.getDictionaryCountActionAsp();

        this.dictionaryYesNo = this.dictionaryService.getYesNoDictionary();
        this.dictionaryCountActionYes = dictionaryCA.filter(dc => dc.code.startsWith('Y'));
        this.dictionaryCountActionNo = dictionaryCA.filter(dc => dc.code.startsWith('N') && dc.code != 'N100');
        this.dictionaryCountActionAspYes = dictionaryCAAsp.filter(dc => dc.code.startsWith('Y'));
        this.dictionaryCountActionAspNo = dictionaryCAAsp.filter(dc => dc.code.startsWith('N'));
    }

    private initPersonCountActions(iin: string) {

        let request = new CountRequest();
        request.iin = iin;
        request.countCode = 'S05';
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
        if (['S0501', 'S0502', 'S0503', 'S0504'].includes(countCode)) {
            dictionaryCount = this.dictionaryCountActionAspYes.concat(this.dictionaryCountActionAspNo);
        } else {
            dictionaryCount = this.dictionaryCountActionYes.concat(this.dictionaryCountActionNo);
        }

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

}
