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

    // Mock data for testing
    private mockDictionary: Array<TzhsDictionary> = [
        {
            id: 1,
            code: 'FINANCIAL',
            nameRu: 'Финансовые трудности',
            nameKz: 'Қаржылық қиындықтар',
            descr: 'Потеря работы, значительные долги или недостаток средств для удовлетворения базовых потребностей, таких как еда и жилье'
        },
        {
            id: 2,
            code: 'HEALTH',
            nameRu: 'Здоровье',
            nameKz: 'Денсаулық',
            descr: 'Серьезные заболевания или травмы, требующие длительного лечения и реабилитации, что может ограничивать способность человека работать или самостоятельно заботиться о себе'
        },
        {
            id: 3,
            code: 'FAMILY',
            nameRu: 'Поддержка семьи',
            nameKz: 'Отбасын қолдау',
            descr: 'Развод, потеря близкого человека, насилие в семье или конфликты, которые могут вызывать эмоциональный стресс и нестабильность'
        },
        {
            id: 4,
            code: 'ADDICTION',
            nameRu: 'Зависимости',
            nameKz: 'Тәуелділік',
            descr: 'Проблемы с алкоголем, наркотиками или азартными играми, которые могут разрушать личную и профессиональную жизнь человека'
        },
        {
            id: 5,
            code: 'REFUGEE',
            nameRu: 'Беженцы и мигранты',
            nameKz: 'Босқындар мен көші-қон',
            descr: 'Люди, вынужденные покинуть свои дома из-за войны, преследований или экономических трудностей, сталкиваются с адаптацией в новой стране и поиском работы и жилья'
        },
        {
            id: 6,
            code: 'ASP',
            nameRu: 'Назначение АСП',
            nameKz: 'АСП тағайындау',
            descr: 'Назначение АСП'
        },
        {
            id: 7,
            code: 'JP',
            nameRu: 'Назначение ЖП',
            nameKz: 'ЖП тағайындау',
            descr: 'Назначение ЖП'
        }
    ];

    constructor(public utilService: UtilService,
                private tzhsService: TzhsService,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        // Use mock data for testing
        this.dictionary = this.mockDictionary;

        // Uncomment the following lines when ready to use real API
        // this.dictionaryService.getTzhsDictionary().subscribe({
        //     next: response => {
        //         this.dictionary = response;
        //     }, error: errorResponse => {
        //         this.utilService.displayError(errorResponse);
        //     }
        // });
    }

    selectMemberPage(item: TzhsDictionary) {
        this.selectedTzhsId = item.code;
        this.select();
    }

    private select() {
        // Mock data for testing
        this.list = [
            {
                iin: '123456789012',
                fio: 'Иванов Иван Иванович',
                birthDate: '15.03.1985',
                address: 'г. Алматы, ул. Абая, д. 150, кв. 25'
            },
            {
                iin: '987654321098',
                fio: 'Петрова Анна Сергеевна',
                birthDate: '22.07.1990',
                address: 'г. Астана, ул. Республики, д. 45, кв. 12'
            },
            {
                iin: '456789123456',
                fio: 'Сидоров Петр Александрович',
                birthDate: '08.11.1978',
                address: 'г. Шымкент, ул. Туркестанская, д. 78, кв. 33'
            },
            {
                iin: '111222333444',
                fio: 'Козлова Мария Дмитриевна',
                birthDate: '12.04.1982',
                address: 'г. Алматы, ул. Толе би, д. 89, кв. 7'
            },
            {
                iin: '555666777888',
                fio: 'Нурланов Алихан Болатович',
                birthDate: '30.09.1975',
                address: 'г. Астана, ул. Кенесары, д. 23, кв. 15'
            },
            {
                iin: '999888777666',
                fio: 'Ахметова Гульнара Рашидовна',
                birthDate: '18.12.1988',
                address: 'г. Шымкент, ул. Абая, д. 156, кв. 42'
            },
            {
                iin: '444333222111',
                fio: 'Бекенов Даурен Саматович',
                birthDate: '05.06.1980',
                address: 'г. Алматы, ул. Достык, д. 67, кв. 19'
            },
            {
                iin: '777888999000',
                fio: 'Исмаилова Айгуль Каримовна',
                birthDate: '25.01.1992',
                address: 'г. Астана, ул. Бейбитшилик, д. 34, кв. 28'
            },
            {
                iin: '222333444555',
                fio: 'Темирбаев Нурлан Амангельдиевич',
                birthDate: '14.08.1977',
                address: 'г. Шымкент, ул. Ташкентская, д. 92, кв. 11'
            },
            {
                iin: '666777888999',
                fio: 'Садыкова Айжан Талгатовна',
                birthDate: '03.11.1985',
                address: 'г. Алматы, ул. Розыбакиева, д. 123, кв. 35'
            }
        ];
        this.pagination.totalItems = 100; // Mock total for pagination testing
        this.pagination.itemsPerPage = 10;

        // Uncomment the following lines when ready to use real API
        // let request = {
        //     nameId: this.selectedTzhsId,
        //     page: this.pagination.currentPage,
        //     size: this.pagination.itemsPerPage
        // };
        //
        // this.tzhsService.getTzhsMemberPage(request).subscribe({
        //     next: response => {
        //         this.list = response.data;
        //         this.pagination.totalItems = response.total;
        //     }, error: errorResponse => {
        //         this.utilService.displayError(errorResponse);
        //     }
        // });
    }

    changePage(page: number) {
        this.pagination.currentPage = page;
        this.select();
    }

    getPageNumbers(): number[] {
        const totalPages = this.getTotalPages();
        const currentPage = this.pagination.currentPage;
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }

    getTotalPages(): number {
        return Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    }
}
