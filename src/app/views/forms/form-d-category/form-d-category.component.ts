import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {CountMember} from "../../../models/count/count-member";
import {CountMemberAction} from "../../../models/count/count-member-action";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {GovAgencyService} from "../../../services/gov-agency.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {WorkspaceService} from "../../../services/workspace.service";
import {CountRequest} from "../../../models/count/count-request";

@Component({
  selector: 'app-form-d-category',
  templateUrl: './form-d-category.component.html',
  styleUrls: ['./form-d-category.component.scss']
})
export class FormDCategoryComponent implements OnInit {

    @Input() hasAdminPermissions: boolean;
    @Input() eventShowFormDCategory: EventEmitter<string>;

    iin: string;
    countMemberList: Array<CountMember>;
    countMemberActionList: Array<CountMemberAction>;

    dictionaryActionIP: Array<Dictionary>;

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
      this.eventShowFormDCategory.asObservable().subscribe(iinValue => {
          this.iin = iinValue;
          this.initPersonCountActions(iinValue);
      });
  }

    private initDictionaries() {
        this.dictionaryService.getDictionaryGovAction(GovAgencyService.DE_CATEGORY_DICTIONARY_CODE_PREFIX).subscribe({
            next: response => {
                this.dictionaryActionIP = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    private initPersonCountActions(iin: string) {
        let request = new CountRequest();
        request.iin = iin;
        request.countCode = GovAgencyService.D_CATEGORY_CODE_PREFIX;
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
            let dictionaryArray = this.dictionaryActionIP;
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
