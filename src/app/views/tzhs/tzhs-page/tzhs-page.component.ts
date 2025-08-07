import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {TzhsService} from "../../../services/tzhs.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {TzhsDictionary} from "../../../models/tzhs-dictionary";
import {PersonDetail} from "../../../models/person/person-detail";
import {Pagination} from "../../../models/pagination";

@Component({
    selector: 'app-tzhs-page',
    templateUrl: './tzhs-page.component.html',
    styleUrls: ['./tzhs-page.component.scss']
})
export class TzhsPageComponent implements OnInit {

    visible = [true];

    dictionary: Array<TzhsDictionary> = new Array<TzhsDictionary>();

    selectedTzhsId: string | undefined;
    list: Array<any> = new Array<any>();
    pagination: Pagination = new Pagination();

    constructor(public utilService: UtilService,
                private tzhsService: TzhsService,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getTzhsDictionary().subscribe({
            next: response => {
                this.dictionary = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    selectMemberPage(item: TzhsDictionary) {
        this.selectedTzhsId = item.code;
        this.select();
    }

    private select() {
        let request = {
            nameId: this.selectedTzhsId,
            page: this.pagination.currentPage,
            size: this.pagination.itemsPerPage
        };

        this.tzhsService.getTzhsMemberPage(request).subscribe({
            next: response => {
                this.list = response.data;
                this.pagination.totalItems = response.total;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    changePage(page: number) {
        this.pagination.currentPage = page;
        this.select();
    }
}
