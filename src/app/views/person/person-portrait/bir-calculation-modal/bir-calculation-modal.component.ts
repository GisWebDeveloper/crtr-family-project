import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BirCalculationService} from "../../../../services/bir-calculation.service";
import {BirCalculationResponse} from "../../../../models/bir-calculation/bir-calculation-response";
import {UtilService} from "../../../../services/util.service";

@Component({
    selector: 'app-bir-calculation-modal',
    templateUrl: './bir-calculation-modal.component.html',
    styleUrls: ['./bir-calculation-modal.component.scss']
})
export class BirCalculationModalComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<string>;

    visible = false;
    iin: string;
    date: string | undefined;
    siap: boolean;

    cal1: BirCalculationResponse | undefined;
    cal2: BirCalculationResponse | undefined;


    constructor(private birCalculationService: BirCalculationService,
                private utilService: UtilService) {
    }


    ngOnInit(): void {
        this.eventShowModal.subscribe(iinValue => {
            this.iin = iinValue;
            this.visible = true;
            this.cal1 = undefined;
            this.cal2= undefined;
            this.date = undefined;

        });
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    search() {
        let request = {
            iin: this.iin,
            riskDate: this.date,
            paymentCode: this.siap ? '07040201' : '07040101',
            requestDate: (new Date(2025, 3, 8)).toISOString().slice(0, 10)
        }
        this.birCalculationService.getCalculation(request).subscribe({
            next: response => {
                this.cal1 = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });

        let nextDate = new Date();
        nextDate.setDate((new Date().getDate()) + 1);
        request.requestDate = nextDate.toISOString().slice(0, 10);
        this.birCalculationService.getCalculation(request).subscribe({
            next: response => {
                this.cal2 = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }
}
