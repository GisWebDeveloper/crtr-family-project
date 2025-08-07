import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PersonService} from "../../../../services/person.service";
import {FamilyMember} from "../../../../models/family/family-member";
import {UtilService} from "../../../../services/util.service";
import {Pagination} from "../../../../models/pagination";

@Component({
    selector: 'app-person-reg-address-modal',
    templateUrl: './person-reg-address-modal.component.html',
    styleUrls: ['./person-reg-address-modal.component.scss']
})
export class PersonRegAddressModalComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<string>;

    visible = false;


    params: {
        memberList: Array<FamilyMember>,
        iin: string,
        pagination: Pagination,
        filter: any
    }

    constructor(
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
        this.personService.getRegAddressMembers(this.params.filter).subscribe({
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
}
