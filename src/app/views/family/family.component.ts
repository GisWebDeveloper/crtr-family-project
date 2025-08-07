import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FamilyService} from "../../services/family.service";
import {UtilService} from "../../services/util.service";
import {TranslateService} from "@ngx-translate/core";
import {BaseRequest} from "../../models/base-request";
import {FamilyResponse} from "../../models/family/family-response";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-family',
    templateUrl: './family.component.html',
    styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

    @Output() eventShowFamilyPortrait: EventEmitter<FamilyResponse> = new EventEmitter();

    warningMessage: string;

    constructor(private activatedRoute: ActivatedRoute,
                private familyService: FamilyService,
                private translateService: TranslateService,
                private utilService: UtilService) {
    }

    ngOnInit(): void {
        const iinValue = this.activatedRoute.snapshot.paramMap.get('iin') || "";
        this.warningMessage = '';
        this.searchByIIN(iinValue);
    }

    searchByIIN(iin: string) {
        let familyRequest = new BaseRequest();
        familyRequest.iin = iin;
        this.familyService.getFamilyInfo(familyRequest).subscribe({
            next: response => {
                if (!response.family) {
                    this.warningMessage = this.translateService.instant('warnings.no-data-found');
                } else {
                    this.eventShowFamilyPortrait.emit(response);
                }
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }
}
