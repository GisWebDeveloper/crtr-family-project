import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {TableHeaderConfig} from "../../../../models/dynamic-table/table-header-config";
import {PovertyRating} from "../../../../models/report/report-region-rating/poverty-rating";
import {Dictionary} from "../../../../models/dictionary";
import {Region} from "../../../../models/region";

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

    @Input() tableHeaderConfig: TableHeaderConfig;
    @Input() ratingType: Dictionary;

    @Output() eventShowListModal = new EventEmitter<{
        category: Dictionary,
        region: Region,
    }>();

    data: PovertyRating[] = [];
    stateList: PovertyRating[] = [];
    stateTotal: PovertyRating | undefined;
    regionList: PovertyRating[] = [];
    selectedState: PovertyRating | undefined = undefined;


    constructor(public utilService: UtilService,
                public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.reportService.getRegionRantingReport(this.ratingType.code).subscribe({
                next: response => {
                    this.data = response.regionRatingList;
                    response.regionRatingList
                        .filter(temp => temp.level === 1)
                        .forEach(temp => {
                            temp.isHidden = false;
                            temp.isTotal = false;
                            this.stateList.push(temp);
                        });
                    this.stateList = this.utilService.sortArray(this.stateList, this.getRatingCnt());
                    this.stateTotal = response.total;
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            }
        );
    }


    selectStatRegion(state: PovertyRating): void {
        if (this.selectedState != state) {
            this.selectedState = state;
            if (state.level === 1) {
                this.regionList = this.data.filter(temp => temp.region.parentId === state.region.id);
                this.regionList.forEach(temp => {
                    temp.level = 2;
                    temp.isHidden = false;
                })
            }
        } else {
            this.selectedState = undefined;
        }
    }

    getCntProperties(): string[] {
        return this.utilService.getObjectProperties(this.data[0]).filter(temp => temp.includes('cnt'));
    }

    private getRatingCnt(): string {
        let cnts = this.getCntProperties();
        return cnts[cnts.length - 1];
    }

    showListModal(region: Region): void {
        if (this.ratingType) {
            this.eventShowListModal.emit({
                category: this.ratingType,
                region: region,
            });
        }
    }
}
