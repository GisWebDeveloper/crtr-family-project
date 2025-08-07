import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {FamilyService} from "../../../services/family.service";
import {UtilService} from "../../../services/util.service";

@Component({
    selector: 'app-family-meri',
    templateUrl: './family-meri.component.html',
    styleUrls: ['./family-meri.component.scss']
})
export class FamilyMeriComponent implements OnInit {

    @Input() iin: EventEmitter<string>;
    @Output() eventShowModal: EventEmitter<number> = new EventEmitter<number>();

    selectedIIn: string
    available: any;

    @Output() eventSearchStatusStat: EventEmitter<{search: string, iin: string}> = new EventEmitter<{search: string, iin: string}>();
    @Output() eventSearchStatusStat2: EventEmitter<{search: string, iin: string}> = new EventEmitter<{search: string, iin: string}>();
    @Output() eventSearchStatusStat3: EventEmitter<{search: string, iin: string}> = new EventEmitter<{search: string, iin: string}>();

    visible = [false, false, false];

    constructor(private familyService: FamilyService,
                private utilService: UtilService) {
    }

    ngOnInit(): void {
        this.iin.asObservable().subscribe(iinValue => {
            this.eventSearchStatusStat.emit({search: 'family_meri', iin: this.selectedIIn});
            this.eventSearchStatusStat2.emit({search: 'family_meri_finished', iin: this.selectedIIn});
            this.eventSearchStatusStat3.emit({search: 'family_meri_future', iin: this.selectedIIn});
            this.selectedIIn = iinValue;
            this.familyService.getAvailableMeri(this.selectedIIn).subscribe({
                next: response => {
                    this.available = response;
                    // this.available.necessity = this.available.necessity.filter((temp: { nameId: number; }) => temp.nameId !== 1006 && temp.nameId !== 1007);
                },
                error: errorResponse => {
                    this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
                }
            });
        });
    }

    ngAfterViewInit(): void {
        this.eventSearchStatusStat.emit({search: 'family_meri', iin: this.selectedIIn});
        this.eventSearchStatusStat2.emit({search: 'family_meri_finished', iin: this.selectedIIn});
        this.eventSearchStatusStat3.emit({search: 'family_meri_future', iin: this.selectedIIn});
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];

        // Rerender child components
        if (id === 0 && this.visible[id]) {
            this.visible[1] = false;
            setTimeout(() => {
                this.eventSearchStatusStat.emit({search: 'family_meri', iin: this.selectedIIn});
                this.eventSearchStatusStat3.emit({search: 'family_meri_future', iin: this.selectedIIn});
            }, DataService.EVENT_DELAY);
        }

        if (id === 1 && this.visible[id]) {
            setTimeout(() => {
                this.eventSearchStatusStat2.emit({search: 'family_meri_finished', iin: this.selectedIIn});
            }, DataService.EVENT_DELAY);
        }

        if (id === 2 && this.visible[id]) {
            setTimeout(() => {
                this.eventSearchStatusStat.emit({search: 'family_meri', iin: this.selectedIIn});
            }, DataService.EVENT_DELAY);
        }
    }

    openQuestionModal(number: number) {
        this.eventShowModal.emit(number);
    }

    getRandomNumber() {
        return 80;
    }
}
