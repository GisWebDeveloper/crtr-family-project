import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { TabContentRefDirective } from '@coreui/angular';

@Component({
    selector: 'app-dynamic-tzhs-external',
    templateUrl: './dynamic-tzhs-external.component.html',
    styleUrls: ['./dynamic-tzhs-external.component.scss'],
})
export class DynamicTzhsExternalComponent implements OnInit {
    @ViewChild('tabContent1') tabContent1!: TabContentRefDirective;
    @ViewChild('tabContent2') tabContent2!: TabContentRefDirective;
    @ViewChild('tabContent3') tabContent3!: TabContentRefDirective;

    // Properties to track selected tab indices
    selectedMainTab = 1; // 2024 is now the active tab (index 1)
    selectedSubTab = 'table-dynamic-tzhs-2024';

    constructor(public reportService: ReportService) {}

    ngOnInit(): void {}

    onMainTabChange(tabIndex: number) {
        this.selectedMainTab = tabIndex;
        this.selectedSubTab = `table-dynamic-tzhs-${
            tabIndex === 0 ? '2025' : '2024'
        }`;
    }

    onSubTabChange(tabIndex: string) {
        this.selectedSubTab = tabIndex;
    }

    exportTableToExcel() {
        console.log(this.selectedSubTab);

        this.reportService.exportTableToExcel(this.selectedSubTab);
    }
}
