import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FamilyService} from "../../../../services/family.service";
import {UtilService} from "../../../../services/util.service";

@Component({
  selector: 'app-family-meri-questions',
  templateUrl: './family-meri-questions.component.html',
  styleUrls: ['./family-meri-questions.component.scss']
})
export class FamilyMeriQuestionsComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<number>;

    meriNumber: number;
    visible: boolean = false;

    constructor(private familyService: FamilyService,
                private utilService: UtilService) {
    }

  ngOnInit(): void {
      this.eventShowModal.subscribe(number => {
          this.meriNumber = number;
          this.visible = true;
      });
  }



    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }



}
