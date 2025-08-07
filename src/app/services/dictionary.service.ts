import {Injectable} from '@angular/core';
import {Dictionary} from "../models/dictionary";
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Region} from "../models/region";
import {TranslateService} from "@ngx-translate/core";
import {DictionaryMonth} from "../models/dictionary-month";
import {UtilService} from "./util.service";
import {FamDictionaries} from "../models/fam-dictionaries";
import {KandasAnswer} from "../models/kandas/kandas-answer";
import {TzhsDictionary} from "../models/tzhs-dictionary";


@Injectable({
    providedIn: 'root'
})
export class DictionaryService {

    private readonly dictionaryActionCodes: Dictionary[];
    private readonly dictionaryAsp: Dictionary[];
    private readonly dictionaryCredit: Dictionary[];
    private readonly dictionaryCriminalRecord: Dictionary[];
    private readonly dictionaryDisabled2: Dictionary[];
    private readonly dictionaryDisease: Dictionary[];
    private readonly dictionaryEducation: Dictionary[];
    private readonly dictionaryEmployment: Dictionary[];
    private readonly dictionaryFamilyType: Dictionary[];
    private readonly dictionaryGrst: Dictionary[];
    private readonly dictionaryIncome: Dictionary[];
    private readonly dictionaryLand: Dictionary[];
    private readonly dictionaryLph: Dictionary[];
    private readonly dictionaryRealEstate2: Dictionary[];
    private readonly dictionaryTransport2: Dictionary[];
    private readonly dictionaryUl: Dictionary[];

    private readonly dictionaryActionConfirmation: Dictionary[];
    private readonly dictionaryCountAction: Dictionary[];
    private readonly dictionaryCountActionAsp: Dictionary[];
    private readonly dictionaryCountActionConfirmation: Dictionary[];
    private readonly dictionaryYesNo: Dictionary[];
    private readonly dictionaryReverseYesNo: Dictionary[];
    private readonly dictionaryCountActionAspApplicant: Dictionary[];

    private readonly statChildDictionary: Dictionary[];
    private readonly statChildPathDictionary: Dictionary[];
    private readonly statMemberDictionary: Dictionary[];
    private readonly statPopulationDictionary: Dictionary[];
    private readonly statSusnDictionary: Dictionary[];

    private readonly dictionaryEmployables: Dictionary[];
    private readonly dictionaryKandasMonitorStatus: { id: number, name: string }[];

    constructor(
        private httpService: HttpService,
        private translateService: TranslateService,
        private utilService: UtilService) {

        this.dictionaryActionCodes = [
            {id: 1, code: 'AUTH', nameRu: 'Авторизация', nameKz: 'Авторизация'},
            {id: 2, code: 'DOWNLOAD', nameRu: 'Скачивание', nameKz: 'Жүктеу'},
            {id: 3, code: 'REPORT', nameRu: 'Скачивание отчета', nameKz: 'Есепті жүктеу'},
            {id: 4, code: 'SEARCH-IIN', nameRu: 'Поиск по ИИН', nameKz: 'ЖСН бойынша іздеу'},
            {id: 5, code: 'SEARCH-NAME', nameRu: 'Поиск по ФИО', nameKz: 'ТАӘ бойынша іздеу'},
            {id: 6, code: 'SEARCH-PHONE', nameRu: 'Поиск номера телефона', nameKz: 'Телефон нөмірін іздеу'},
            {id: 7, code: 'VIEW-PERSON', nameRu: 'Просмотр портрета', nameKz: 'Портреті көру'},
        ];
        this.dictionaryAsp = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 2, code: '1', nameRu: 'Ранее получал', nameKz: 'Бұрын алынған'},
            {id: 3, code: '2', nameRu: 'Текущий получатель', nameKz: 'Ағымдағы алушы'},
            {id: 4, code: '3', nameRu: 'Подходящие для АСП', nameKz: 'АӘК алуға сәйкес'}
        ];
        this.dictionaryCredit = [
            {id: 1, code: '0', nameRu: 'Есть непогашенный кредит', nameKz: 'Өтелмеген несие бар'},
            {id: 2, code: '1', nameRu: 'Кредитов нет', nameKz: 'Несиеcі жок'}
        ];
        this.dictionaryCriminalRecord = [
            {id: 1, code: '0', nameRu: 'Отбывает наказание', nameKz: 'Жазасын өтеуде'},
            {id: 2, code: '1', nameRu: 'Был ранее судим', nameKz: 'Бұрын жазазы өтелген'},
            {id: 3, code: '2', nameRu: 'Сведений о судимости нет', nameKz: 'Қылмыстық жазбалар жоқ'}
        ];
        this.dictionaryDisabled2 = [
            {id: 1, code: '0', nameRu: 'Нет лица с инвалидностью', nameKz: 'Мүмкіндігі бар жан жоқ'},
            {
                id: 2,
                code: '1',
                nameRu: 'Лицо с инвалидность 1 группы или 2 группы',
                nameKz: '1 немесе 2 топ мүгедектігі бар жан'
            },
            {
                id: 3,
                code: '2',
                nameRu: 'Лицо с инвалидность с детства или ребенок-инвалид',
                nameKz: 'Бала кезінен мүгедектігі бар адам немесе мүгедектігі бар бала'
            },
            {id: 4, code: '3', nameRu: 'Лицо с инвалидность 3 группы', nameKz: '3 топ мүгедектігі бар адам'}
        ];
        this.dictionaryDisease = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {
                id: 2,
                code: '1',
                nameRu: 'Имеются с хроническими заболеваниями',
                nameKz: 'Созылмалы аурулары бар'
            },
            {id: 3, code: '2', nameRu: 'Состоят на диспансерском учете', nameKz: 'Диспансерлік есепте тұрады'}
        ];
        this.dictionaryEducation = [
            {id: 1, code: '0', nameRu: 'Без образования', nameKz: 'Білімсіз'},
            {id: 2, code: '1', nameRu: 'Наличие школьного образования', nameKz: 'Мектептік білімі бар'},
            {
                id: 3,
                code: '2',
                nameRu: 'Наличие ТиПО или среднеспециальное образование',
                nameKz: 'ТжКБ немесе орта арнаулы білімнің болуы'
            },
            {id: 4, code: '3', nameRu: 'Наличие высшего образования', nameKz: 'Жоғарғы білімінің болуы'},
            {
                id: 5,
                code: '4',
                nameRu: 'Наличие послевузовского образования',
                nameKz: 'Жоғары оқу орнынан кейінгі білімнің болуы'
            }
        ];
        this.dictionaryEmployment = [
            {id: 1, code: '0', nameRu: 'Имеются безработные', nameKz: 'Жұмыссыздар бар'},
            {id: 2, code: '1', nameRu: 'Трудоустроен 1 человек', nameKz: '1 адам жұмыспен қамтылған'},
            {id: 3, code: '2', nameRu: 'Трудоустроено 2 и более человек', nameKz: '2 адам жұмыспен қамтылған'}
        ];
        this.dictionaryGrst = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 2, code: '1', nameRu: 'Есть 1', nameKz: '1 бар'},
            {id: 3, code: '2', nameRu: 'Есть 2 и более', nameKz: '2 не одан көп'},
        ];
        this.dictionaryIncome = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 2, code: '1', nameRu: 'Ниже черты бедности', nameKz: 'Кедейлік шегінен төмен'},
            {
                id: 3,
                code: '2',
                nameRu: 'Выше ЧБ, но ниже ПМ',
                nameKz: 'Кедейлік шегінен жоғары және күнкөріс деңгейі төмен'
            },
            {id: 4, code: '3', nameRu: 'Выше ПМ', nameKz: 'Күнкөріс деңгейінен жоғары'},
            {id: 5, code: '4', nameRu: 'Выше 2-х ПМ', nameKz: '2 күнкөріс деңгейінен жоғары'},
            {id: 6, code: '5', nameRu: 'Выше 3-х ПМ', nameKz: '3 күнкөріс деңгейінен жоғары'}
        ];
        this.dictionaryLand = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 2, code: '1', nameRu: 'ИЖС', nameKz: 'Жеке тұрғын үй '},
            {id: 3, code: '2', nameRu: 'С/х зем. участок (более 1 ГА)', nameKz: 'жер телімі (1 ГА көп)'}
        ];
        this.dictionaryLph = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 2, code: '1', nameRu: 'до 500 тыc', nameKz: '500 мың. дейін'},
            {id: 3, code: '2', nameRu: '500-1 000 тыc', nameKz: '500-1 000 мың'},
            {id: 3, code: '3', nameRu: '1 000 - 2 000 тыc', nameKz: '1 000 - 2 000 мың'},
            {id: 3, code: '4', nameRu: '2 000 - 3 000 тыc', nameKz: '2 000 - 3 000 мың'},
            {id: 3, code: '5', nameRu: '3 000 тыc и более', nameKz: '3 000 мың және көп'},
        ];
        this.dictionaryRealEstate2 = [
            {id: 1, code: '0', nameRu: 'Нет жилья', nameKz: 'Тұрғын үй жоқ'},
            {
                id: 2,
                code: '1',
                nameRu: 'Есть 1 жилье, менее 18 кв.метров на 1 члена семьи',
                nameKz: '1 тұрғын үй бар, 1 отбасы мүшесіне 18 ш.м. аз'
            },
            {
                id: 3,
                code: '2',
                nameRu: 'Есть 1 жилье, более 18 кв.метров на 1 члена семьи',
                nameKz: '1 тұрғын үй бар, 1 отбасы мүшесіне 18 ш.м. артық'
            },
            {id: 4, code: '3', nameRu: 'Есть 2  жилья', nameKz: '2 тұрғын үй бар'},
            {id: 5, code: '4', nameRu: 'Есть от 3-5 жилья', nameKz: '3-5 тұрғын үй бар'},
            {id: 6, code: '5', nameRu: 'Есть  от 6-10 жилья', nameKz: '6-10 тұрғын үй бар'},
            {id: 7, code: '6', nameRu: 'Есть 11 и более', nameKz: '11 және көп тұрғын үй бар'}
        ];
        this.dictionaryTransport2 = [
            {id: 1, code: '0', nameRu: 'Нет движимого имущества', nameKz: 'Көлік жоқ'},
            {id: 2, code: '1', nameRu: '1 легковой транспорт', nameKz: '1 көлік'},
            {id: 3, code: '2', nameRu: '2 транспорта', nameKz: '2 көлік'},
            {
                id: 4,
                code: '3',
                nameRu: 'Коммерческий транспорт (автобус, грузовой автотранспорт)',
                nameKz: 'Коммерциялық көлік (автобус, жүкті көлік)'
            },
            {id: 5, code: '4', nameRu: '3 и более легковых транспорта', nameKz: '3 және көп көлік'}
        ];
        this.dictionaryUl = [
            {id: 1, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 2, code: '1', nameRu: 'Учредитель ЮЛ', nameKz: 'ЗТ құрылтайшысы'},
            {id: 2, code: '2', nameRu: 'Учредитель ИП', nameKz: 'ЖК құрылтайшысы'},
        ];
        this.dictionaryCountAction = [
            {id: 1, code: 'Y100', nameRu: 'Не информирован', nameKz: 'Хабарланбаған'},
            {id: 2, code: 'Y200', nameRu: 'Имеются проблемы с документами', nameKz: 'Құжаттармен қиыншылықтар бар'},
            {
                id: 3,
                code: 'Y300',
                nameRu: 'В настоящее время оформляет государственную услугу',
                nameKz: 'Қазіргі уақытта мемлекеттік қызмет рәсімдеуде'
            },
            {
                id: 4,
                code: 'Y400',
                nameRu: 'Отказ от государственной услуги',
                nameKz: 'Мемлекеттік қызмет көрсетуден бас тарту'
            },
            {id: 5, code: 'N100', nameRu: 'Данные не подтвердились', nameKz: 'Деректер расталмады'},
            {
                id: 6,
                code: 'N200',
                nameRu: 'Не проживает по адресу регистрации',
                nameKz: 'Тіркеу мекенжайында тұрмайды'
            },
            {
                id: 7,
                code: 'N300',
                nameRu: 'Выехал за пределы Республики Казахстан',
                nameKz: 'Қазақстан Республикасынан кеткен'
            },
            {id: 8, code: 'N400', nameRu: 'Имеются сведения о смерти', nameKz: 'Өлім туралы ақпарат бар'},
            {
                id: 9,
                code: 'N500',
                nameRu: 'Не соответствует требованиям на оказание государственной услуги',
                nameKz: 'Мемлекеттік қызметтерді көрсету талаптарына сәйкес келмейді'
            },
        ];

        this.dictionaryCountActionAsp = [
            {id: 1, code: 'Y100', nameRu: 'Не информирован', nameKz: 'Хабарланбаған'},
            {id: 2, code: 'Y200', nameRu: 'Имеются проблемы с документами', nameKz: 'Құжаттармен қиыншылықтар бар'},
            {
                id: 3,
                code: 'Y300',
                nameRu: 'В настоящее время оформляет государственную услугу – назначение АСП',
                nameKz: 'Қазіргі уақытта мемлекеттік қызмет рәсімдеуде – АӘК тағайындау'
            },
            {
                id: 4,
                code: 'Y400',
                nameRu: 'Отказ от государственной услуги',
                nameKz: 'Мемлекеттік қызмет көрсетуден бас тарту'
            },
            {
                id: 5,
                code: 'N100',
                nameRu: 'Не проживает по адресу регистрации',
                nameKz: 'Тіркеу мекенжайында тұрмайды'
            },
            {
                id: 6,
                code: 'N200',
                nameRu: 'Выехал за пределы Республики Казахстан',
                nameKz: 'Қазақстан Республикасынан кеткен'
            },
            {id: 7, code: 'N300', nameRu: 'Имеются сведения о смерти', nameKz: 'Өлім туралы мәлімет бар'},
            {
                id: 8,
                code: 'N400',
                nameRu: 'СДД превышает либо равен черте бедности',
                nameKz: 'Жан басына шаққандағы орташа табысы кедейлiктiң шегіне тең немесе артық'
            },
            {
                id: 9,
                code: 'N500',
                nameRu: 'Выявление факта сокрытия доходов',
                nameKz: 'Табысты жасыру фактісі анықталды'
            },
        ];

        this.dictionaryCountActionAspApplicant = [
            {id: 10, code: 'Y120', nameKz: 'Неформально наемный работник', nameRu: 'Неформально наемный работник'},
            {id: 11, code: 'Y121', nameKz: 'Незарегистрированный ИП', nameRu: 'Незарегистрированный ИП'},
            {id: 12, code: 'Y122', nameKz: 'Занят в ЛПХ', nameRu: 'Занят в ЛПХ'},
            {id: 13, code: 'Y123', nameKz: 'Домохозяйка', nameRu: 'Домохозяйка'},
            {id: 14, code: 'Y124', nameKz: 'Выехавший за пределы РК', nameRu: 'Выехавший за пределы РК'},
            {id: 15, code: 'Y125', nameKz: 'Умерший', nameRu: 'Умерший'},
            {
                id: 16,
                code: 'Y126',
                nameKz: 'Не проживают по месту регистрации',
                nameRu: 'Не проживают по месту регистрации'
            },
            {id: 17, code: 'Y127', nameKz: 'Обучающийся', nameRu: 'Обучающийся'},
            {id: 18, code: 'Y128', nameKz: 'Проходящие воинскую службу', nameRu: 'Проходящие воинскую службу'},
            {id: 19, code: 'Y129', nameKz: 'Другие с указанием причины', nameRu: 'Другие с указанием причины'},
            {
                id: 20,
                code: 'Y130',
                nameKz: 'Незарегистрированный безработный',
                nameRu: 'Незарегистрированный безработный'
            },
            {id: 21, code: 'N120', nameKz: 'Неформально наемный работник', nameRu: 'Неформально наемный работник'},
            {id: 22, code: 'N121', nameKz: 'Незарегистрированный ИП', nameRu: 'Незарегистрированный ИП'},
            {id: 23, code: 'N122', nameKz: 'Занят в ЛПХ', nameRu: 'Занят в ЛПХ'},
            {id: 24, code: 'N123', nameKz: 'Домохозяйка', nameRu: 'Домохозяйка'},
            {id: 25, code: 'N124', nameKz: 'Выехавший за пределы РК', nameRu: 'Выехавший за пределы РК'},
            {id: 26, code: 'N125', nameKz: 'Умерший', nameRu: 'Умерший'},
            {
                id: 27,
                code: 'N126',
                nameKz: 'Не проживают по месту регистрации',
                nameRu: 'Не проживают по месту регистрации'
            },
            {id: 28, code: 'N127', nameKz: 'Обучающийся', nameRu: 'Обучающийся'},
            {id: 29, code: 'N128', nameKz: 'Проходящие воинскую службу', nameRu: 'Проходящие воинскую службу'},
            {id: 30, code: 'N129', nameKz: 'Другие с указанием причины', nameRu: 'Другие с указанием причины'},
            {
                id: 31,
                code: 'N130',
                nameKz: 'Незарегистрированный безработный',
                nameRu: 'Незарегистрированный безработный'
            },
        ];

        this.dictionaryCountActionConfirmation = [
            {id: 1, code: 'Y', nameRu: 'Да', nameKz: 'Ия'},
            {id: 2, code: 'N', nameRu: 'Нет', nameKz: 'Жоқ'},
            {id: 3, code: 'E', nameRu: 'Не заполнено', nameKz: 'Толтырылмаған'},
        ];

        this.dictionaryActionConfirmation = [
            {id: 1, code: 'F', nameRu: 'Заполнено', nameKz: 'Толтырылған'},
            {id: 2, code: 'E', nameRu: 'Не заполнено', nameKz: 'Толтырылмаған'},
        ];

        this.dictionaryYesNo = [
            {id: 1, code: '1', nameRu: 'Да', nameKz: 'Ия'},
            {id: 2, code: '0', nameRu: 'Нет', nameKz: 'Жоқ'},
        ];

        this.dictionaryReverseYesNo = [
            {id: 2, code: '0', nameRu: 'Да', nameKz: 'Ия'},
            {id: 1, code: '1', nameRu: 'Нет', nameKz: 'Жоқ'},
        ];

        this.statChildDictionary = [
            {id: 2, code: '', nameRu: '1 ребенок', nameKz: '1 бала'},
            {id: 3, code: '', nameRu: '2 детей', nameKz: '2 бала'},
            {id: 4, code: '', nameRu: '3 детей', nameKz: '3 бала'},
            {id: 5, code: '', nameRu: '4 детей', nameKz: '4 бала'},
            {id: 6, code: '', nameRu: '5 детей', nameKz: '5 бала'},
            {id: 7, code: '', nameRu: '6 детей', nameKz: '6 бала'},
            {id: 8, code: '', nameRu: '7 и более детей', nameKz: '7 және көп бала'},
        ];

        this.statChildPathDictionary = [
            {
                id: 1, code: '',
                nameRu: 'Количество женщин, с зарегистрированными родами в ИС МЗ РК и без актовых записей о рождении в ЗАГС',
                nameKz: 'Қазақстан Республикасы Денсаулық сақтау министрлігінің АЖ-да тууы тіркелген және АХАЖ органдарында тууы туралы жазбасы жоқ әйелдердің саны',
                order: 2
            },
            {
                id: 2,
                code: '',
                nameRu: 'Количество женщин, зарегистрированных более 9 месяцев назад и без записей о рождении в ИС МЗ РК',
                nameKz: 'Қазақстан Республикасы Денсаулық сақтау министрлігінің АЖ-да 9 айдан астам бұрын тіркелген және тууы тіркелмеген әйелдер саны',
                order: 1
            },
            {
                id: 3,
                code: '',
                nameRu: 'Количество детей не посещающие дошкольные организации',
                nameKz: 'Мектепке дейінгі ұйымдарға бармайтын балалар саны',
                order: 5
            },
            {
                id: 4,
                code: '',
                nameRu: 'Количество детей не посещающие школы',
                nameKz: 'Мектептен тыс балалардың саны',
                order: 6
            },
            {
                id: 5,
                code: '',
                nameRu: 'Количество детей не прикрепленные к медицинским учреждениям',
                nameKz: 'Медициналық мекемелерге бекітілмеген балалар саны',
                order: 4
            },
            {id: 6, code: '', nameRu: 'Молодёжь NEET', nameKz: 'NEET жастары', order: 7},
            {
                id: 7,
                code: '',
                nameRu: 'Дети, на которых не получают пособие по уходу за ребенком до 1.5 лет',
                nameKz: '1.5 жасқа дейінгі бала күтімі бойынша жәрдемақы алмайтын балалар',
                order: 3
            }
        ];

        this.statMemberDictionary = [
            {id: 2, code: '', nameRu: '1 человек', nameKz: '1 адам'},
            {id: 3, code: '', nameRu: '2 человека', nameKz: '2 адам'},
            {id: 4, code: '', nameRu: '3 человека', nameKz: '3 адам'},
            {id: 5, code: '', nameRu: '4 человека', nameKz: '4 адам'},
            {id: 6, code: '', nameRu: '5 человек', nameKz: '5 адам'},
            {id: 7, code: '', nameRu: '6 человек', nameKz: '6 адам'},
            {id: 8, code: '', nameRu: '7 человек', nameKz: '7 адам'},
            {id: 9, code: '', nameRu: '8 человек', nameKz: '8 адам'},
            {id: 10, code: '', nameRu: '9 человек', nameKz: '9 адам'},
            {id: 11, code: '', nameRu: '10 и более человек', nameKz: '10 және көп адам'},];

        this.statPopulationDictionary = [
            {id: 1, code: '', nameRu: 'Население', nameKz: 'Халық'},
            {id: 2, code: '', nameRu: 'Мужчины', nameKz: 'Еркектер'},
            {id: 3, code: '', nameRu: 'Женщины', nameKz: 'Әйелдер'},
            {id: 4, code: '', nameRu: 'Дети', nameKz: 'Балалар'}];

        this.statSusnDictionary = [
            {id: 1, code: '', nameRu: 'Пенсионеры', nameKz: 'Зейнеткерлер', order: 1},
            {
                id: 2,
                code: '',
                nameRu: 'Многодетные семьи и награжденные многодетные матери',
                nameKz: 'Көп балалы отбасылар мен марапатталған көп балалы аналар',
                order: 7
            },
            {
                id: 3,
                code: '',
                nameRu: 'Ветераны ВОВ, приравненные по льготам к ветеранам ВОВ,  ветераны боевых действий на территории других государств',
                nameKz: 'Жеңілдіктері бойынша Екінші дүниежүзілік соғыс ардагерлеріне, басқа мемлекеттердің аумағындағы соғыс қимылдарына қатысқан ардагерлерге теңестірілгендер',
                order: 2
            },
            {
                id: 4,
                code: '',
                nameRu: 'Семьи лиц, погибщих (умерших) при исполнении воин. служ. обяз.',
                nameKz: 'мемлекеттiк немесе қоғамдық мiндеттерiн, әскери қызметiн орындау кезiнде қаза тапқан (қайтыс болған) адамдардың отбасылары .',
                order: 3
            },
            {id: 5, code: '', nameRu: 'Кандасы', nameKz: 'Қандастар', order: 9},
            {id: 6, code: '', nameRu: 'Получатели АСП', nameKz: 'АӘК Алушылар', order: 8},
            {
                id: 7,
                code: '',
                nameRu: 'Лица с инвалидностью I или II группы',
                nameKz: 'I немесе II топ мүгедектігі бар  адамдар',
                order: 4
            },
            {
                id: 8,
                code: '',
                nameRu: 'Количество семей, воспитывающих детей с инвалидностью',
                nameKz: 'Мүгедектігі бар балаларды тәрбиелеп отырған отбасылар саны',
                order: 5
            },
            {
                id: 9,
                code: '',
                nameRu: 'Дети оставшиеся без попечения и сироты',
                nameKz: 'Қамқорсыз қалған балалар мен жетімдер',
                order: 6
            },
        ];

        this.dictionaryFamilyType = [
            {id: 1, code: '1', nameRu: 'Полная', nameKz: 'Толық'},
            {id: 2, code: '2', nameRu: 'Неполная', nameKz: 'Толық емес'},
            {id: 4, code: '4', nameRu: 'Одиноко проживающие лица', nameKz: 'Жалғыз тұратын'},
            {
                id: 10,
                code: '10',
                nameRu: 'Лица проживающие в МСУ',
                nameKz: 'МӘМ-де тұратын тұлғалар'
            }
        ];

        this.dictionaryEmployables = [
            {
                id: 1,
                code: 'RC521',
                nameRu: 'Сведения о незанятых лицах в возрасте от 23 до 35 лет',
                nameKz: '23 жастан 35 жасқа дейінгі жұмыспен қамтылмаған тұлғалар туралы мәліметтер'
            }, {
                id: 2,
                code: 'RC522',
                nameRu: 'Сведения о лицах с инвалидностью, нуждающиеся в трудоустройстве',
                nameKz: 'Жұмысқа орналасуға мұқтаж мүгедектігі бар тұлғалар туралы мәліметтер'
            }, {
                id: 3,
                code: 'RC523',
                nameRu: 'Сведения о лицах с инвалидностью, нуждающихся в ССУ и ТСР (ИПР)',
                nameKz: 'АӘҚ және ТОҚ (ОЖЖ) мұқтаж мүгедектігі бар тұлғалар туралы мәліметтер'
            }, {
                id: 4,
                code: 'RC524',
                nameRu: 'Сведения о трудоспособных лицах старше 35 лет, имеющих 2-х и более незанятых в семье',
                nameKz: 'Отбасында 2 және одан да көп жұмыспен қамтылмаған 35 жастан асқан еңбекке қабілетті тұлғалар туралы мәліметтер'
                /*
            }, {
                id: 5,
                code: 'RC525',
                nameRu: 'Сведения о лицах имеющих кредиты и просрочки',
                nameKz: 'Сведения о лицах имеющих кредиты и просрочки'
            }, {
                id: 6,
                code: 'RC526',
                nameRu: 'Сведения о семьях, не имеющих жилья',
                nameKz: 'Сведения о семьях, не имеющих жилья'
            }, {
                id: 5,
                code: '005',
                nameRu: 'Сведения о семьях, доходы которых ниже величины прожиточного минимума и черты бедности',
                nameKz: ''
                 */
            }

        ];

        this.dictionaryKandasMonitorStatus = [
            {
                id: 4,
                name: 'Оказано'
            }, {
                id: 3,
                name: 'Не нуждается'
            }, {
                id: 5,
                name: 'В работе'
            }, {
                id: 1,
                name: 'Подтвержденные'
            }
        ];
    }

    public getDictionaryAppItemType(): Observable<Array<Dictionary>> {
        return this.httpService.post('/dictionary/appItemType', {});
    }

    public getDictionaryASPAction(): Observable<Array<Dictionary>> {
        return this.httpService.post('/dictionary/aspAction', {});
    }

    public getDictionaryCount(code: string): Observable<Array<Dictionary>> {
        return this.httpService.get('/dictionary/count/' + code, {});
    }

    public getDictionaryCountById(countId: number): Observable<Dictionary> {
        return this.httpService.get('/dictionary/countById/' + countId, {});
    }

    public getDictionaryProactiveSmsCount(): Observable<Array<Dictionary>> {
        return this.httpService.get('/dictionary/proactiveSms/count', {});
    }

    public getDictionaryGoDECount(): Observable<Array<Dictionary>> {
        return this.httpService.get('/dictionary/goDE', {});
    }

    public getDictionaryNeedActionStatus(): Observable<Array<Dictionary>> {
        return this.httpService.get('/dictionary/need-action/status', {});
    }

    public getFamilyTypeDictionary(): Observable<Array<Dictionary>> {
        return this.httpService.post('/dictionary/familyType', {});
    }

    public getFamilyPmDictionary(): Observable<any> {
        return this.httpService.post('/dictionary/familyPm', {});
    }

    public getFamilyTzhsDictionary2(): Observable<any> {
        return this.httpService.post('/dictionary/familyTzhs2', {});
    }

    public getRegionById(regionId: number): Observable<Region> {
        return this.httpService.get('/dictionary/regionById/' + regionId, {});
    }

    public getRegionChildren(): Observable<Array<Region>> {
        return this.httpService.post('/dictionary/region/children', {});
    }

    public getRegionTree(regionId: number | undefined): Observable<Array<Region>> {
        return regionId ?
            this.httpService.post('/dictionary/region/tree/' +  regionId, {}) :
            this.httpService.post('/dictionary/region/tree', {});
    }

    public getDictionaryGovAction(code: string): Observable<Array<Dictionary>> {
        return this.httpService.get('/dictionary/gov/action/' + code, {});
    }

    public getDictionaryFam(dictionaryName: string): Observable<Dictionary[]> {
        return this.httpService.get('/dictionary/fam/' + dictionaryName, {});
    }

    public getFamDictionaries(): Observable<FamDictionaries> {
        return this.httpService.get("/dictionary/famDictionaries", {});
    }

    public getRefreshableOsmsDates(): Observable<{ dates: Date[] }> {
        return this.httpService.get("/dictionary/refreshableOsmsDates", {});
    }

    public getRefreshableOsmsHospitals(): Observable<{ ord: string, nameRu: string }[]> {
        return this.httpService.get("/dictionary/refreshableOsmsHospitals", {});
    }

    public getRatingDictionary(): Observable<Dictionary[]> {
        return this.httpService.get("/dictionary/rating", {});
    }

    public getReportKandasFamTzhsMonitoringDictionary(): Observable<Dictionary[]> {
        return this.httpService.get("/dictionary/famTzhsMonitoringDictionary", {});
    }

    public getKandasAnswersDictionary(countId: number): Observable<KandasAnswer[]> {
        return this.httpService.get('/dictionary/kandasAnswers/' + countId, {});
    }

    public getTzhsDictionary(): Observable<Array<TzhsDictionary>> {
        return this.httpService.get('/dictionary/tzhs', {});
    }

    public getDictionaryActionCodes(): Dictionary[] {
        return this.dictionaryActionCodes;
    }

    public getDictionaryCountAction(): Dictionary[] {
        return this.dictionaryCountAction;
    }

    public getDictionaryCountAspApplicant(): Dictionary[] {
        return this.dictionaryCountActionAspApplicant;
    }

    public getDictionaryCountActionAsp(): Dictionary[] {
        return this.dictionaryCountActionAsp;
    }

    public getDictionaryActionConfirmation(): Dictionary[] {
        return this.dictionaryActionConfirmation;
    }

    public getDictionaryCountActionConfirmation(): Dictionary[] {
        return this.dictionaryCountActionConfirmation;
    }

    public getYesNoDictionary(): Dictionary[] {
        return this.dictionaryYesNo;
    }

    public getReverseYesNoDictionary(): Dictionary[] {
        return this.dictionaryReverseYesNo;
    }

    public getStatChildDictionary(): Dictionary[] {
        return this.statChildDictionary;
    }

    public getStatChildPathDictionary(): Dictionary[] {
        return this.statChildPathDictionary;
    }

    public getStatMemberDictionary(): Dictionary[] {
        return this.statMemberDictionary;
    }

    public getStatPopulationDictionary(): Dictionary[] {
        return this.statPopulationDictionary;
    }

    public getStatSusnDictionary(): Dictionary[] {
        return this.statSusnDictionary;
    }

    public getDictionaryTransport2(): Dictionary[] {
        return this.dictionaryTransport2;
    }

    public getDictionaryDisabled2(): Dictionary[] {
        return this.dictionaryDisabled2;
    }

    public getDictionaryGrst(): Dictionary[] {
        return this.dictionaryGrst;
    }

    public getDictionaryIncome(): Dictionary[] {
        return this.dictionaryIncome;
    }

    public getDictionaryDisease(): Dictionary[] {
        return this.dictionaryDisease;
    }

    public getDictionaryCriminalRecord(): Dictionary[] {
        return this.dictionaryCriminalRecord;
    }

    public getDictionaryRealEstate2(): Dictionary[] {
        return this.dictionaryRealEstate2;
    }

    public getDictionaryEducation(): Dictionary[] {
        return this.dictionaryEducation;
    }

    public getDictionaryEmployment(): Dictionary[] {
        return this.dictionaryEmployment;
    }

    public getDictionaryLand(): Dictionary[] {
        return this.dictionaryLand;
    }

    public getDictionaryLph(): Dictionary[] {
        return this.dictionaryLph;
    }

    public getDictionaryCredit(): Dictionary[] {
        return this.dictionaryCredit;
    }

    public getDictionaryAsp(): Dictionary[] {
        return this.dictionaryAsp;
    }

    public getDictionaryUl(): Dictionary[] {
        return this.dictionaryUl;
    }

    public getDictionaryFamilyType(): Dictionary[] {
        return this.dictionaryFamilyType;
    }

    public getDictionaryEmployables(): Dictionary[] {
        return this.dictionaryEmployables;
    }

    public getDictionaryKandasMonitorStatus() {
        return this.dictionaryKandasMonitorStatus;
    }

    public dictionaryToSelectOptions(dictionaryList: Dictionary[], useId?: Boolean): any[] {
        let optionList: any[] = [];
        dictionaryList.forEach(dictionaryItem => {
            optionList.push({
                label: this.translateService.currentLang == 'kz' ? dictionaryItem.nameKz : dictionaryItem.nameRu,
                value: (useId ? dictionaryItem.id : dictionaryItem.code)
            });
        });
        return optionList;
    }

    public listToSelectOptions(dictionaryList: any[], useId?: Boolean): any[] {
        let optionList: any[] = [];
        dictionaryList.forEach(item => {
            optionList.push({
                label: this.translateService.currentLang == 'kz' ? item.nameKz : item.nameRu,
                value: (useId ? item.id : item.code)
            });
        });
        return optionList;
    }

    public getDictionaryItem(dictionaryList: Array<any>, dictionaryId: number) {
        return dictionaryList.filter(item => {
            return item.id === dictionaryId;
        })[0];
    }

    public getDictionaryOption(dictionaryOptions: Array<any>, value: any) {
        return dictionaryOptions.filter(item => {
            return item.value == value;
        })[0];
    }

    public getYearList(): Array<number> {
        let result = new Array<number>();
        const today = new Date();
        for (let year = today.getFullYear(); year >= 2022; year--) {
            result.push(year);
        }
        return result;
    }

    public getMonthDictionary(): Array<Dictionary> {
        let result = new Array<Dictionary>();
        result.push(new Dictionary(1, '01', 'Январь', 'Қаңтар'))
        result.push(new Dictionary(2, '02', 'Февраль', 'Ақпан'))
        result.push(new Dictionary(3, '03', 'Март', 'Наурыз'))
        result.push(new Dictionary(4, '04', 'Апрель', 'Сәуір'))
        result.push(new Dictionary(5, '05', 'Май', 'Мамыр'))
        result.push(new Dictionary(6, '06', 'Июнь', 'Маусым'))
        result.push(new Dictionary(7, '07', 'Июль', 'Шілде'))
        result.push(new Dictionary(8, '08', 'Август', 'Тамыз'))
        result.push(new Dictionary(9, '09', 'Сентябрь', 'Қыркүйек'))
        result.push(new Dictionary(10, '10', 'Октябрь', 'Қазан'))
        result.push(new Dictionary(11, '11', 'Ноябрь', 'Қараша'))
        result.push(new Dictionary(12, '12', 'Декабрь', 'Желтоқсан'))
        return result;
    }

    public getMonthYearDictionary(limit: number, useAsDifference?: boolean): Array<DictionaryMonth> {
        let result = new Array<DictionaryMonth>();
        const currentDate = new Date();
        const yearBegin = currentDate.getFullYear();
        const yearEnd = useAsDifference ? yearBegin - limit : limit;
        const yearPrefix = this.utilService.getLocalization('ж.', 'г.');
        const monthDictionary = this.getMonthDictionary().sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0))
        for (let year = yearBegin; year >= yearEnd; year--) {
            monthDictionary.forEach(month => {
                if (year == yearBegin && month.id <= (currentDate.getMonth() + 1)) {
                    result.push(new DictionaryMonth(1000000 + year + month.id, '' + year + month.code,
                        this.utilService.concat(' ', year.toString(), yearPrefix, month.nameRu),
                        this.utilService.concat(' ', year.toString(), yearPrefix, month.nameKz),
                        year, month.id));
                } else if (year != yearBegin) {
                    result.push(new DictionaryMonth(1000000 + year + month.id, '' + year + month.code,
                        this.utilService.concat(' ', year.toString(), yearPrefix, month.nameRu),
                        this.utilService.concat(' ', year.toString(), yearPrefix, month.nameKz),
                        year, month.id));
                }
            });
        }
        return result;
    }
}
