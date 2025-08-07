import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {CountMember} from "../../../models/count/count-member";
import {CountMemberAction} from "../../../models/count/count-member-action";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {UtilService} from "../../../services/util.service";
import {WorkspaceService} from "../../../services/workspace.service";
import {CountRequest} from "../../../models/count/count-request";
import {GovAgencyService} from "../../../services/gov-agency.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-form-mon',
    templateUrl: './form-mon.component.html',
    styleUrls: ['./form-mon.component.scss']
})
export class FormMonComponent implements OnInit {

    @Input() hasAdminPermissions: boolean;
    @Input() eventShowFormMON: EventEmitter<string>;

    iin: string;
    countMemberList: Array<CountMember>;
    countMemberActionList: Array<CountMemberAction>;

    dictionaryActionGarden: Array<Dictionary>;
    dictionaryActionSchool: Array<Dictionary>;

    constructor(
        private dictionaryService: DictionaryService,
        public govAgencyService: GovAgencyService,
        public translateService: TranslateService,
        public utilService: UtilService,
        private workspaceService: WorkspaceService) {
    }

    ngOnInit(): void {
        this.initDictionaries();
        this.countMemberList = new Array<CountMember>();
        this.countMemberActionList = new Array<CountMemberAction>();
        this.eventShowFormMON.asObservable().subscribe(iinValue => {
            this.iin = iinValue;
            this.initPersonCountActions(iinValue);
        });
    }

    private initDictionaries() {
        this.dictionaryService.getDictionaryGovAction(GovAgencyService.MON_GARDEN_CODE_PREFIX).subscribe({
            next: response => {
                this.dictionaryActionGarden = response;
                if (this.dictionaryActionGarden) {
                    this.dictionaryActionGarden.forEach(item => {
                        if (item.code == GovAgencyService.MON_GARDEN_CODE_50) item.disabled = true;
                    });
                }
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });

        this.dictionaryService.getDictionaryGovAction(GovAgencyService.MON_SCHOOL_CODE_PREFIX).subscribe({
            next: response => {
                this.dictionaryActionSchool = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    private initPersonCountActions(iin: string) {
        let request = new CountRequest();
        request.iin = iin;
        request.countCode = GovAgencyService.MON_LIST_CODE_PREFIX;
        this.workspaceService.getPersonCountActions(request).subscribe({
            next: response => {
                this.countMemberList = response.countMemberList;
                this.countMemberActionList = response.countMemberActionList;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    getCountDictionaryName(countCode: string, actionCode?: string) {
        let name = actionCode;
        if (actionCode) {
            let dictionaryArray = new Array<Dictionary>();
            if (countCode == GovAgencyService.MON_LIST_GARDEN_CODE) dictionaryArray = this.dictionaryActionGarden;
            if (countCode == GovAgencyService.MON_LIST_SCHOOL_CODE) dictionaryArray = this.dictionaryActionSchool;
            const cd = dictionaryArray.find(item => item.code == actionCode);
            if (cd) name = cd.nameRu;
        }
        return name;
    }

    saveCountMemberAction() {
        const emptyCM = this.countMemberList.find(cm => !cm.actionCode);
        if (emptyCM) {
            this.utilService.notifyError('Выберите значение из справочника!');
        } else {
            let request = new CountRequest();
            request.countMemberList = this.countMemberList;
            this.workspaceService.savePersonCountActions(request).subscribe(() => {
                this.initPersonCountActions(this.iin);
            });
        }
    }

}
