import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {ReportRegionRanking} from "../../../models/report/report-region-rating/report-region-ranking";
import {RegionStatistics} from "../../../models/region-statistics/region-statistics";
import {PopulationAgeStatistics} from "../../../models/region-statistics/population-age-statistics";

@Component({
    selector: 'app-region-statistics-graph-modal',
    templateUrl: './region-statistics-graph-modal.component.html',
    styleUrls: ['./region-statistics-graph-modal.component.scss']
})
export class RegionStatisticsGraphModalComponent implements OnInit {
    @Input() eventShowModal: EventEmitter<{
        data: ReportRegionRanking<RegionStatistics> |
            {
                manAge: ReportRegionRanking<PopulationAgeStatistics>,
                womanAge: ReportRegionRanking<PopulationAgeStatistics>,
                field: string
            },
        type: string
    }>;
    @ViewChild('chart') chart: ElementRef;

    // 0. MODAL
    visible = false;
    data: any;
    manAge: ReportRegionRanking<PopulationAgeStatistics>;
    womanAge: ReportRegionRanking<PopulationAgeStatistics>;
    field: string;
    type: string;

    @Output() eventGetData: EventEmitter<any> = new EventEmitter<{
        data: ReportRegionRanking<RegionStatistics> |
            {
                manAge: ReportRegionRanking<PopulationAgeStatistics>,
                womanAge: ReportRegionRanking<PopulationAgeStatistics>,
                field: string
            },
        type: string
    }>();

    constructor(public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventShowModal.subscribe(data => {
            this.type = data.type;
            if (data.type === 'age' && 'manAge' in data.data) {
                this.manAge = data.data.manAge;
                this.womanAge = data.data.womanAge;
                this.field = data.data.field
            }

            this.data = data.data
            this.visible = true;
            this.eventGetData.emit(data);

        });
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    getAgeStat(temp: PopulationAgeStatistics) {
        return this.utilService.getObjectFieldValue(temp, this.field);
    }

}
