import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {UtilService} from "../../../services/util.service";
import {ReportActualization} from "../../../models/report/report-actualization";

@Component({
    selector: 'app-actualization',
    templateUrl: './actualization.component.html',
    styleUrls: ['./actualization.component.scss']
})
export class ActualizationComponent implements OnInit {

    list: ReportActualization[] = [];
    total: ReportActualization | undefined;
    date: string | null = null;
    dates: string[] = [];
    dateIndex = -1;
    reverseOrderDates: string[] = [];

    constructor(public reportService: ReportService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.reportService.getReportActualizationDates().subscribe({
            next: response => {
                this.dates = response;
                this.reverseOrderDates = [...response].reverse();
                this.date = response[response.length - 1];
                this.search();
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    public search() {
        this.reportService.getReportActualization({date: this.date}).subscribe({
            next: response => {
                // his.dictionaryFamilyTzhsGroup
                //     .map((temp, index) => temp === this.selectedFamilyTzhsGroup ? index + 1 : -1)
                //     .filter(index => index !== -1);
                this.dateIndex = this.dates.map((temp, index) => temp === this.date ? index : -1)
                    .filter(temp => temp !== -1)[0];
                this.list = response.filter(temp => {
                    if (temp.state.id !== 99) {
                        temp.col16 = temp.col5 - temp.col6;
                    }
                    return temp;
                });
                this.calculateTotal();
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    private calculateTotal() {
        this.total = new ReportActualization();

        this.list.forEach(temp => {
            // @ts-ignore

            for (let i = 2; i < 17; i++) {
                // @ts-ignore
                if (temp['col' + i]) {
                    // @ts-ignore
                    if (!this.total['col' + i]) {
                        // @ts-ignore
                        this.total['col' + i] = 0;
                    }
                    // @ts-ignore
                    this.total['col' + i] += temp['col' + i];
                }
            }
        })
    }

    getPrevColumnLabel() {
        return this.utilService.getTranslationValue('actualization.difference-from-prev') + ' ' + (this.dateIndex === 0 ? '01.08.2024' : this.dates[this.dateIndex - 1]) + ' г.';
    }

}
