import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {UtilService} from "../../../services/util.service";
import {ReportDynamicTzhs} from "../../../models/report/report-dynamic-tzhs";
import {Region} from "../../../models/region";

@Component({
    selector: 'app-dynamic-tzhs',
    templateUrl: './dynamic-tzhs.component.html',
    styleUrls: ['./dynamic-tzhs.component.scss']
})
export class DynamicTzhsComponent implements OnInit {

    @Input() year: string;

    @Output() eventShowListModal = new EventEmitter<{
        region: Region,
        col: number,
        label: string
    }>();

    reportDynamicTzhsList: ReportDynamicTzhs[];

    constructor(public reportService: ReportService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.reportService.getReportDynamicTzhs(this.year).subscribe({
            next: response => {
                this.reportDynamicTzhsList = response;
                // this.countTotal();
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    getValue(item: ReportDynamicTzhs, field: string) {
        // @ts-ignore
        return item[field];
    }

    showListModal(col: number, region: Region) {
        this.eventShowListModal.emit({
            region: region,
            col: col,
            label: this.getLabel(col)
        });
    }

    hasList(col: number) {
        return [24, 26, 28, 30, 38, 40, 42, 44].includes(col);
    }

    private getLabel(col: number) {
        let label = this.utilService.getTranslationValue('report-page.dynamic-tzhs.this-month') + ' / ';

        label = label.concat([24, 26, 28, 30].includes(col) ?
            this.utilService.getTranslationValue('report-page.dynamic-tzhs.category-d') :
            this.utilService.getTranslationValue('report-page.dynamic-tzhs.category-e'));
        label = label.concat(' / ');

        label = label.concat(this.utilService.getTranslationValue('report-page.dynamic-tzhs.moved-to-another-category') + " / ");


        if ([24, 38].includes(col)) {
            label = label.concat(this.utilService.getTranslationValue('report-page.dynamic-tzhs.to-a'));
        }
        if ([26, 40].includes(col)) {
            label = label.concat(this.utilService.getTranslationValue('report-page.dynamic-tzhs.to-b'));
        }
        if ([28, 42].includes(col)) {
            label = label.concat(this.utilService.getTranslationValue('report-page.dynamic-tzhs.to-c'));
        }
        if ([30].includes(col)) {
            label = label.concat(this.utilService.getTranslationValue('report-page.dynamic-tzhs.to-e'));
        }
        if ([44].includes(col)) {
            label = label.concat(this.utilService.getTranslationValue('report-page.dynamic-tzhs.to-d'));
        }

        return label;
    }
}
