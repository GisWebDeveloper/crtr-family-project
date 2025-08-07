import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {PersonService} from "../../../services/person.service";
import {PersonSearchRequest} from "../../../models/person/person-search-request";
import {UtilService} from "../../../services/util.service";
import {PersonDetail} from "../../../models/person/person-detail";
import {Pagination} from "../../../models/pagination";
import {FamilyService} from "../../../services/family.service";

@Component({
    selector: 'app-person-search',
    templateUrl: './person-search.component.html',
    styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit {

    isPageLoaded: boolean;
    iin: string | null;
    fullName: string | null;
    mode: string;

    personList: Array<PersonDetail> = [];
    pagination: Pagination;

    constructor(
        private dataService: DataService,
        private familyService: FamilyService,
        private personService: PersonService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.personList = new Array<PersonDetail>();
        this.pagination = new Pagination();

        this.iin = this.dataService.getPersonIIN();
        this.fullName = this.dataService.getPersonFullName();
        this.mode = this.dataService.getPersonSearchMode() || 'NAME';
        this.searchPerson();
    }

    searchPerson() {
        this.isPageLoaded = false;
        let request: PersonSearchRequest = new PersonSearchRequest();
        request.mode = this.mode;
        request.page = this.pagination.currentPage;
        request.size = this.pagination.itemsPerPage;
        if (this.mode == 'IIN') {
            this.searchPersonByIIN(request);
        } else {
            this.searchPersonByFullName(request);
        }
    }

    searchPersonByIIN(request: PersonSearchRequest) {
        if (this.iin) {
            request.iin = this.iin;
            this.personService.searchPerson(request).subscribe({
                next: response => {
                    this.isPageLoaded = true;
                    if (this.iin && response.data.length == 1) {
                        this.familyService.openFamilyPortrait(this.iin);
                    } else {
                        this.personList = response.data;
                        this.pagination.totalItems = response.total;
                    }
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        } else {
            const message = this.utilService.getTranslationValue('search-page.warning-empty-iin');
            this.utilService.notifyError(message);
        }
    }

    searchPersonByFullName(request: PersonSearchRequest) {
        if (this.fullName) {
            request.fullName = this.fullName;
            this.personService.searchPerson(request).subscribe({
                next: response => {
                    this.isPageLoaded = true;
                    this.personList = response.data;
                    this.pagination.totalItems = response.total;
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        } else {
            const message = this.utilService.getTranslationValue('search-page.warning-empty-full-name');
            this.utilService.notifyError(message);
        }
    }

    changePage(page: number): void {
        this.pagination.currentPage = page;
        this.searchPerson();
    }
}
