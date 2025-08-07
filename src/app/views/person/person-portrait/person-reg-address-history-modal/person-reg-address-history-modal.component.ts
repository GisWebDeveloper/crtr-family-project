import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FamilyMember} from "../../../../models/family/family-member";
import {Pagination} from "../../../../models/pagination";
import {PersonService} from "../../../../services/person.service";
import {UtilService} from "../../../../services/util.service";
import {PersonRegHistory} from "../../../../models/common/person-reg-history";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-person-reg-address-history-modal',
  templateUrl: './person-reg-address-history-modal.component.html',
  styleUrls: ['./person-reg-address-history-modal.component.scss']
})
export class PersonRegAddressHistoryModalComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<string>;

    visible = false;


    params: {
        memberList: Array<PersonRegHistory>,
        iin: string,
        pagination: Pagination,
        filter: any
    }

    constructor(
        private translateService: TranslateService,
        private personService: PersonService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.params = {
            memberList: [],
            iin: '',
            pagination: new Pagination(),
            filter: {}
        };

        this.eventShowModal.subscribe(iinValue => {
            this.visible = true;
            this.params.pagination.currentPage = 1;
            this.params.filter.iin = iinValue;
            this.initList();
        });
    }

    initList() {
        this.params.filter.page = this.params.pagination.currentPage;
        this.params.filter.size = this.params.pagination.itemsPerPage;
        this.personService.getRegAddressHistory(this.params.filter).subscribe({
            next: response => {
                this.params.memberList = response.data ? response.data : [];
                this.params.pagination.totalItems = response.total;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        this.initList();
    }

    public getPersonRegAddress(personRegHistory: PersonRegHistory) {
        const name = this.translateService.currentLang === 'kz' ? 'nameKz' : 'nameRu';
        const district = personRegHistory.stateName ? personRegHistory.stateName : null;
        const region = personRegHistory.regionName ? personRegHistory.regionName : null;
        const streetRu = personRegHistory.regAddressStreet ? 'Улица ' + personRegHistory.regAddressStreet.replace(/Улица/ig, '').trim() : '';
        const streetKz = personRegHistory.regAddressStreet ? personRegHistory.regAddressStreet.replace(/көшесі/ig, '').trim() + ' көшесі' : ''
        const street = this.translateService.currentLang === 'kz' ? streetKz : streetRu;
        return [district, region, personRegHistory.regAddressCity, street, personRegHistory.regAddressBuilding, personRegHistory.regAddressCorpus, personRegHistory.regAddressFlat].filter(Boolean).join(', ');
    }

}
