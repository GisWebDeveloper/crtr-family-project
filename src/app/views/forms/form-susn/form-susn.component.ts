import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {KandasService} from "../../../services/kandas.service";
import {MonitoringSusn} from "../../../models/kandas/monitoring-susn";
import {UtilService} from "../../../services/util.service";

@Component({
    selector: 'app-form-susn',
    templateUrl: './form-susn.component.html',
    styleUrls: ['./form-susn.component.scss']
})
export class FormSusnComponent implements OnInit {

    @Input() hasAdminPermissions: boolean;
    @Input() eventShowFormSusn: EventEmitter<string>;

    iin: string;
    monitoringSusn: MonitoringSusn;

    constructor(private kandasService: KandasService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventShowFormSusn.asObservable().subscribe(iin => {
            this.iin = iin;
            this.initPersonCountActions(iin);
        });
    }

    private initPersonCountActions(iin: string) {
        this.kandasService.getSusnForm(iin).subscribe({
            next: response => {
                this.monitoringSusn = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    getValue(value: string) {
        if (!value) {
            return value;
        }
        if (value.toLowerCase() === 'true') {
            return 'Да';
        } else if (value.toLowerCase() === 'false') {
            return 'Нет';
        }
        return value;
    }
}
