import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FamilyService} from "../../../../services/family.service";
import {UtilService} from "../../../../services/util.service";

@Component({
    selector: 'app-family-tzhs-points-modal',
    templateUrl: './family-tzhs-points-modal.component.html',
    styleUrls: ['./family-tzhs-points-modal.component.scss']
})
export class FamilyTzhsPointsModalComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<{iin: string, sduTzhs: string}>;

    visible: boolean = false;
    score: any = undefined;
    newScore: any= undefined;

    params = [
        'fam_sdd',
        'fam_emp',
        'fam_nedv',
        'fam_dv_tran',
        'fam_dv_tran_com',
        'fam_dv_grst',
        'fam_nedv_land',
        'fam_nedv_com',
        'fam_lph',
        'fam_ul',
        'fam_child',
        'fam_inv_1',
        'fam_inv_child',
        'fam_inv_3',
        'fam_disease_b',
        'fam_disease_d',
        // 'b_1',
        'fam_med',
        // 'b_2',
        // 'b_3',
        // 'b_4',
        'fam_osms',
        'fam_credit',
        'fam_credit_z',
        'fam_edu_s',
        'fam_edu_sh',
        // 'b_5',
        // 'b_6',
        // 'b_7',
        // 'b_8',
        'fam_adr',
        // 'b_9',
        // 'b_10',
        // 'b_11'
    ];
     sduTzhs: string;

    constructor(private familyService: FamilyService,
                private utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventShowModal.subscribe(data => {
            this.getTzhsScore(data.iin);
            this.sduTzhs = data.sduTzhs;
            this.visible = true;
        });
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    private getTzhsScore(iin: string) {
        this.familyService.getTzhsScore(iin).subscribe({
            next: response => {
                this.score = response.segmentationXDE;
                this.newScore = response.newScore;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        })
    }
}
