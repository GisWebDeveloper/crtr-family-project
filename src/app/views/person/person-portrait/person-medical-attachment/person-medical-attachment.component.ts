import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MedicalAttachment} from "../../../../models/common/medical-attachment";

@Component({
    selector: 'app-person-medical-attachment',
    templateUrl: './person-medical-attachment.component.html',
    styleUrls: ['./person-medical-attachment.component.scss']
})
export class PersonMedicalAttachmentComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showMedicalAttachment: EventEmitter<Array<MedicalAttachment>>;

    medicalAttachmentList: Array<MedicalAttachment>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.medicalAttachmentList = new Array<MedicalAttachment>();
        this.showMedicalAttachment.asObservable().subscribe(maList => {
            this.medicalAttachmentList = maList;
        });
    }

}
