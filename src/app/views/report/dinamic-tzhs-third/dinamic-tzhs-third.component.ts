import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {ReportNeedActionsRegion} from "../../../models/report/report-na-region";
import {ReportService} from "../../../services/report.service";
import {UtilService} from "../../../services/util.service";

@Component({
    selector: 'app-dinamic-tzhs-third',
    templateUrl: './dinamic-tzhs-third.component.html',
    styleUrls: ['./dinamic-tzhs-third.component.scss']
})
export class DinamicTzhsThirdComponent implements OnInit {

    @Input() year: string;

    @Output() eventSearchStatusStat: EventEmitter<{search: string, iin: string}> = new EventEmitter<{search: string, iin: string}>();

    dictionaryCount2024: Array<Dictionary> = [
        {id: 1, code: 'rep_qlik_dynamic_2024', nameRu: 'Динамика', nameKz: 'Динамика'},
        {
            id: 2,
            code: 'rep_qlik_tzhs_abc_2024',
            nameRu: 'Статистика по семьям, которые перешли в категории A B C',
            nameKz: 'Статистика по семьям, которые перешли в категории A B C'
        },
        {
            id: 3,
            code: 'rep_qlik_tzhs_de_2024',
            nameRu: 'Статистика по семьям, которые перешли в категории D, Е',
            nameKz: 'Статистика по семьям, которые перешли в категории D, Е'
        },
        {
            id: 4,
            code: 'rep_qlik_rt_ehr_2024',
            nameRu: 'Информация по оказанным мерам с 01.08.2024 г.',
            nameKz: 'Информация по оказанным мерам с 01.08.2024 г.'
        },
        {
            id: 5,
            code: 'rep_qlik_edu_preschool_2024',
            nameRu: 'Дети, не посещающие детские дошкольные образовательные учреждения',
            nameKz: 'Дети, не посещающие детские дошкольные образовательные учреждения'
        },
        {
            id: 6,
            code: 'rep_qlik_edu_school_2024',
            nameRu: 'Дети, не посещающие учреждения школу',
            nameKz: 'Дети, не посещающие учреждения школу'
        },
        {
            id: 7,
            code: 'rep_qlik_need_2024',
            nameRu: 'Молодежь  NEET (с 18 до 35 лет)',
            nameKz: 'Молодежь  NEET (с 18 до 35 лет)'
        },
        {
            id: 8,
            code: 'rep_qlik_ip_2024',
            nameRu: 'Количество ИП, КХ, ФХ, не имеющих отчисления в фонды',
            nameKz: 'Количество ИП, КХ, ФХ, не имеющих отчисления в фонды'
        },
        {
            id: 9,
            code: 'rep_qlik_osms_2024',
            nameRu: 'Количество лиц, не охваченных системой ОСМС (Зафиксированные)',
            nameKz: 'Количество лиц, не охваченных системой ОСМС (Зафиксированные)'
        },
        {
            id: 10,
            code: 'rep_qlik_double_iin_2024',
            nameRu: 'Двойные ИИНы',
            nameKz: 'Двойные ИИНы'
        },
        {
            id: 11,
            code: 'rep_qlik_no_reg_2024',
            nameRu: 'Нет регистрации',
            nameKz: 'Нет регистрации'
        },
        {
            id: 12,
            code: 'rep_qlik_no_doc_2024',
            nameRu: 'Недействительный документ',
            nameKz: 'Недействительный документ'
        },
    ];

    dictionaryCountActive: Array<Dictionary> = [
        {id: 1, code: 'rep_qlik_dynamic', nameRu: 'Динамика', nameKz: 'Динамика'},
        {
            id: 2,
            code: 'rep_qlik_tzhs_abc',
            nameRu: 'Статистика по семьям, которые перешли в категории A B C',
            nameKz: 'Статистика по семьям, которые перешли в категории A B C'
        },
        {
            id: 3,
            code: 'rep_qlik_tzhs_de',
            nameRu: 'Статистика по семьям, которые перешли в категории D, Е',
            nameKz: 'Статистика по семьям, которые перешли в категории D, Е'
        },
        {
            id: 4,
            code: 'rep_qlik_rt_ehr',
            nameRu: 'Информация по оказанным мерам с 01.08.2024 г.',
            nameKz: 'Информация по оказанным мерам с 01.08.2024 г.'
        },
        {
            id: 5,
            code: 'rep_qlik_edu_preschool',
            nameRu: 'Дети, не посещающие детские дошкольные образовательные учреждения',
            nameKz: 'Дети, не посещающие детские дошкольные образовательные учреждения'
        },
        {
            id: 6,
            code: 'rep_qlik_edu_school',
            nameRu: 'Дети, не посещающие учреждения школу',
            nameKz: 'Дети, не посещающие учреждения школу'
        },
        {
            id: 7,
            code: 'rep_qlik_need',
            nameRu: 'Молодежь  NEET (с 18 до 35 лет)',
            nameKz: 'Молодежь  NEET (с 18 до 35 лет)'
        }
        ,{
            id: 8,
            code: 'rep_qlik_ip',
            nameRu: 'Количество ИП, КХ, ФХ, не имеющих отчисления в фонды',
            nameKz: 'Количество ИП, КХ, ФХ, не имеющих отчисления в фонды'
        },
        {
            id: 9,
            code: 'rep_qlik_osms',
            nameRu: 'Количество лиц, не охваченных системой ОСМС (Зафиксированные)',
            nameKz: 'Количество лиц, не охваченных системой ОСМС (Зафиксированные)'
        },
        {
            id: 10,
            code: 'rep_qlik_double_iin',
            nameRu: 'Двойные ИИНы',
            nameKz: 'Двойные ИИНы'
        },
        {
            id: 11,
            code: 'rep_qlik_no_reg',
            nameRu: 'Нет регистрации',
            nameKz: 'Нет регистрации'
        },
        {
            id: 12,
            code: 'rep_qlik_no_doc',
            nameRu: 'Недействительный документ',
            nameKz: 'Недействительный документ'
        },
    ];

    dictionaryCount: Array<Dictionary> = [];



    // 0. FILTER // 1. REPORT
    visible = [true, true];

    reportList: Array<ReportNeedActionsRegion> = [];
    reportTotal: ReportNeedActionsRegion = new ReportNeedActionsRegion();
    params: {
        countCode: string,
        dictionary: Dictionary | undefined
        selectedDictionary: Dictionary | undefined;
    }

    constructor(
        public reportService: ReportService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryCount = this.year === '2024' ? this.dictionaryCount2024 : this.dictionaryCountActive;
        this.params = {
            countCode: '',
            dictionary: this.dictionaryCount[0],
            selectedDictionary: undefined
        }
        this.search();
    }

    ngAfterViewInit(): void {
        this.eventSearchStatusStat.emit({search: this.year === '2024' ? 'rep_qlik_dynamic_2024' : 'rep_qlik_dynamic', iin: ''});
    }

    search() {
        // @ts-ignore
        this.eventSearchStatusStat.emit({ search: this.params.dictionary?.code, iin:''});
        this.params.selectedDictionary = this.params.dictionary;
    }

}
