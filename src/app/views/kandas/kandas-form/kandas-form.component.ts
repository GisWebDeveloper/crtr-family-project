import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KandasService} from "../../../services/kandas.service";
import {UtilService} from "../../../services/util.service";
import {KandasMonitorAction} from "../../../models/kandas/kandas-monitor-action";

@Component({
    selector: 'app-kandas-form',
    templateUrl: './kandas-form.component.html',
    styleUrls: ['./kandas-form.component.scss']
})
export class KandasFormComponent implements OnInit {

    kandasMonitorActions: KandasMonitorAction[];
    iin: string;
    fullName: string;

    monitorStatuses = [4, 3, 5];

    constructor(private activatedRoute: ActivatedRoute,
                public utilService: UtilService,
                private kandasService: KandasService) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.iin = params['iin'];
            const countId: number = +(params['countId']);

            this.kandasService.getKandasForm(countId, this.iin).subscribe({
                next: response => {
                    this.kandasMonitorActions = response.list;
                    this.fullName = this.utilService.getCapitalized(response.fullName);
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            })
        });
    }

}
