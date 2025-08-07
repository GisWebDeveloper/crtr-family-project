import {INavData} from '@coreui/angular';
import {AuthService} from "../../services/auth.service";
import {Permissions} from "../../models/administration/permissions";

export interface NavItem extends INavData {
    key?: string;
    itemCode?: string;
    children?: NavItem[];
}

export const navItems: NavItem[] = [
    {
        key: 'menu.main',
        name: 'Главная',
        url: '/stat',
        itemCode: Permissions.PERMISSIONS.MAIN,
        iconComponent: {name: 'cil-home'}
    }, {
        key: 'menu.dynamic-stat',
        name: 'Динамика',
        url: '/dynamic-stat',
        itemCode: Permissions.PERMISSIONS.DYNAMIC_STAT,
        iconComponent: {name: 'cil-home'}
    }, {
        key: 'menu.tzhs',
        name: 'ТЖС (Трудные жизненные ситуации)',
        url: '/tzhs',
        itemCode: Permissions.PERMISSIONS.TZHS_PAGE,
        iconComponent: {name: 'cil-book'}
    }, {
        key: 'menu.necessity',
        name: 'Потребность',
        url: '/necessity',
        itemCode: Permissions.PERMISSIONS.NECESSITY,
        iconComponent: {name: 'cil-money'},
    }, {
        key: 'menu.need',
        name: 'Нуждающиеся',
        url: '/need',
        itemCode: 'workspace',
        iconComponent: {name: 'cil-folder-open'},
        children: [
            {
                key: 'menu.need-actions',
                name: 'Нуждающиеся в мерах',
                url: '/need/need-actions',
                // itemCode: 'workspace',
            }, {
                key: 'menu.social-risks',
                name: 'Социальные риски',
                url: '/need/social-risks',
                // itemCode: 'social-risks',
            }, {
                key: 'menu.kandas',
                name: 'Анкетирование',
                url: '/need/kandas',
                // itemCode: 'kandas',
            }
        ]
    },
    // {
    //     key: 'menu.need-actions',
    //     name: 'Нуждающиеся в мерах',
    //     url: '/need-actions',
    //     itemCode: 'workspace',
    //     iconComponent: {name: 'cil-folder-open'}
    // }, {
    //     key: 'menu.kandas',
    //     name: 'Кандас',
    //     url: '/kandas',
    //     // itemCode: 'workspace',
    //     iconComponent: {name: 'cil-folder-open'}
    // }, {
    //     key: 'menu.social-risks',
    //     name: 'Социальные риски',
    //     url: '/social-risks',
    //     // itemCode: 'social-risks',
    //     iconComponent: {name: 'cil-folder-open'}
    // },
    {
        key: 'menu.asp.applicant',
        name: 'Претенденты на АСП',
        url: '/asp',
        itemCode: Permissions.PERMISSIONS.ASP_APPLICANT,
        iconComponent: {name: 'cil-library'}
    }, {
        key: 'menu.social-statuses',
        name: 'Социальные статусы',
        url: '/social-statuses',
        itemCode: Permissions.PERMISSIONS.SOC_STATUS,
        iconComponent: {name: 'cil-notes'}
    }, {
        key: 'menu.segmentation',
        name: 'Сегментационная модель',
        url: '/segmentation',
        itemCode: Permissions.PERMISSIONS.SEGMENTATION,
        iconComponent: {name: 'cil-storage'}
    },

    // {
    //     key: 'menu.beneficiary',
    //     name: 'Льготники',
    //     url: '/beneficiary',
    //     itemCode: Permissions.PERMISSIONS.BENEFICIARY,
    //     iconComponent: {name: 'cil-notes'}
    // },

    {
        key: 'menu.segmentation-new',
        name: 'Сегментационная модель',
        url: '/segmentation-new',
        itemCode: Permissions.PERMISSIONS.SEGMENTATION_NEW,
        iconComponent: {name: 'cil-storage'}
    }, {
        key: 'menu.monitoring',
        name: 'Мониторинг',
        url: '/monitoring',
        itemCode: Permissions.PERMISSIONS.MONITORING,
        iconComponent: {name: 'cil-calendar'},
        children: [
            {
                key: 'menu.monitoring-asp-short',
                name: 'Мониторинг получателей АСП на соответствие получение ГУ',
                url: '/monitoring/asp',
                itemCode: Permissions.PERMISSIONS.MONITORING_ASP
            }, {
                key: 'menu.monitoring-need-actions',
                name: 'Мониторинг нуждающихся в мерах',
                url: '/monitoring/need-actions',
                itemCode: Permissions.PERMISSIONS.MONITORING_NEED_ACTIONS
            }, {
                key: 'menu.monitoring-child-path',
                name: 'Мониторинг детей',
                url: '/monitoring/child-path'
            }, {
                key: 'menu.monitoring-incorrect-data',
                name: 'Некорректные данные',
                url: '/monitoring/incorrect-data',
                itemCode: Permissions.PERMISSIONS.MONITORING_INCORRECT_DATA
            }
        ]
    }, {
        key: 'menu.reports',
        name: 'Отчеты',
        url: '/report',
        itemCode: Permissions.PERMISSIONS.REPORT,
        iconComponent: {name: 'cil-calculator'},
        children: [
            {
                key: 'menu.reports-dynamic-tzhs',
                name: 'ТЖС динамика',
                itemCode: Permissions.PERMISSIONS.REPORT_DYNAMIC_TZHS,
                url: '/report/dynamic-tzhs'
            }, {
                key: 'menu.reports-need-actions',
                name: 'По нуждающимся в мерах',
                url: '/report/need-actions'
            }, {
                key: 'menu.reports-need-asp',
                name: 'По нуждающимся в АСП',
                url: '/report/need-asp'
            }, {
                key: 'menu.reports-proactive-sms',
                name: 'По количеству СМС проактивных услуг',
                url: '/report/proactive-sms'
            }, {
                key: 'menu.reports-employables',
                name: 'Трудоспособные',
                itemCode: Permissions.PERMISSIONS.REPORT_EMPLOYABLES,
                url: '/report/employables'
            }, {
                key: 'menu.temp',
                name: 'Рейтинг регионов',
                itemCode: Permissions.PERMISSIONS.REPORT_RATING,
                url: '/report/ranking'
            }, {
                key: 'menu.kandas-tzhs',
                name: 'Динамика социального благополучия семьи кандасов',
                itemCode: Permissions.PERMISSIONS.REPORT_KANDAS_TZHS,
                url: '/report/kandas-tzhs'
            }, {
                key: 'menu.kandas-tzhs',
                name: 'Динамика социального благополучия семьи переселенцов',
                itemCode: Permissions.PERMISSIONS.REPORT_PERESELENSY_TZHS,
                url: '/report/pereselency-tzhs'
            }, {
                key: 'menu.report-migration',
                name: 'Миграция населения категории СУСН',
                itemCode: Permissions.PERMISSIONS.REPORT_MIGRATION,
                url: '/report/migration'
            }
        ]
    }, {
        key: 'menu.welfare-history',
        name: 'История благостостояния',
        url: '/welfare',
        itemCode: Permissions.PERMISSIONS.WELFARE,
        iconComponent: {name: 'cil-library'}
    }, {
        key: 'menu.region-statistics',
        name: 'Статистика региона',
        url: '/region-statistics',
        itemCode: Permissions.PERMISSIONS.REGION_STAT,
        // iconComponent: {name: 'cil-library'}
    }, {
        key: 'menu.gov-agency',
        name: 'Данные ГО',
        url: '/gov',
        itemCode: Permissions.PERMISSIONS.GOV,
        iconComponent: {name: 'cil-list-rich'},
        children: [
            {
                key: 'menu.menu.x-category-list',
                name: 'Категории X. Списки',
                url: '/gov/x-category/list',
                itemCode: Permissions.PERMISSIONS.GOV_X_CATEGORY_LIST
            },
            {
                key: 'menu.menu.gov-agency-mon-list',
                name: 'МП РК. Списки',
                url: '/gov/mon/list',
                itemCode: Permissions.PERMISSIONS.GOV_MON_LIST
            }, {
                key: 'menu.menu.gov-agency-mon-report',
                name: 'МП РК. Отчеты',
                url: '/gov/mon/report',
                itemCode: Permissions.PERMISSIONS.GOV_MON_REPORT
            }, {
                key: 'menu.menu.gov-agency-mon-dynamic',
                name: 'МП РК. Динамика',
                url: '/gov/mon/dynamic',
                itemCode: Permissions.PERMISSIONS.GOV_MON_DYNAMIC
            }, {
                key: 'menu.menu.gov-agency-mf-list',
                name: 'МФ РК. Списки',
                url: '/gov/mf/list',
                itemCode: Permissions.PERMISSIONS.GOV_MF_LIST
            }, {
                key: 'menu.menu.gov-agency-mf-report',
                name: 'МФ РК. Отчеты',
                url: '/gov/mf/report',
                itemCode: Permissions.PERMISSIONS.GOV_MF_REPORT
            }, {
                key: 'menu.menu.gov-agency-mf-dynamic',
                name: 'МФ РК. Динамика',
                url: '/gov/mf/dynamic',
                itemCode: Permissions.PERMISSIONS.GOV_MF_DYNAMIC
            }, {
                key: 'menu.menu.gov-agency-mior-list',
                name: 'МКИ РК. Списки',
                url: '/gov/mior/list',
                itemCode: Permissions.PERMISSIONS.GOV_MIOR_LIST
            }, {
                key: 'menu.menu.gov-agency-mior-list',
                name: 'МКИ РК. Отчеты',
                url: '/gov/mior/report',
                itemCode: Permissions.PERMISSIONS.GOV_MIOR_REPORT
            }, {
                key: 'menu.menu.gov-agency-mior-dynamic',
                name: 'МКИ РК. Динамика',
                url: '/gov/mior/dynamic',
                itemCode: Permissions.PERMISSIONS.GOV_MIOR_DYNAMIC
            }, {
                key: 'menu.menu.gov-agency-mz-list',
                name: 'МЗ РК. Списки',
                url: '/gov/mz/list',
                itemCode: Permissions.PERMISSIONS.GOV_MZ_LIST
            }, {
                key: 'menu.menu.gov-agency-mz-report',
                name: 'МЗ РК. Отчеты',
                url: '/gov/mz/report',
                itemCode: Permissions.PERMISSIONS.GOV_MZ_REPORT
            }, {
                key: 'menu.menu.gov-agency-mz-dynamic',
                name: 'МЗ РК. Динамика',
                url: '/gov/mz/dynamic',
                itemCode: Permissions.PERMISSIONS.GOV_MZ_DYNAMIC
            }, {
                key: 'menu.menu.gov-agency-mvd-list',
                name: 'МВД РК. Списки',
                url: '/gov/mvd/list',
                itemCode: Permissions.PERMISSIONS.GOV_MVD_LIST
            }, {
                key: 'menu.menu.gov-agency-mvd-report',
                name: 'МВД РК. Отчеты',
                url: '/gov/mvd/report',
                itemCode: Permissions.PERMISSIONS.GOV_MVD_REPORT
            }, {
                key: 'menu.beneficiary',
                name: 'МТ РК. Списки',
                url: '/gov/mt/list',
                itemCode: Permissions.PERMISSIONS.BENEFICIARY,
            }, {
                key: 'menu.menu.gov-agency-rep-DE',
                name: 'Динамики по данным ГО',
                url: '/gov/rep-de',
                itemCode: Permissions.PERMISSIONS.GOV_REP_DE
            }
        ]
    }, {
        key: 'menu.akim-page',
        name: 'Кабинет Акима',
        url: '/akim',
        itemCode: Permissions.PERMISSIONS.AKIM_PAGE,
        iconComponent: {name: 'cil-room'},
    }, {
        key: 'menu.akim-stat',
        name: 'Статистика',
        url: '/akim-stat',
        itemCode: Permissions.PERMISSIONS.AKIM_STAT,
        // iconComponent: {name: 'cil-room'},
    }, {
        key: 'menu.administration',
        name: 'Администрирование',
        url: '/administration',
        itemCode: Permissions.PERMISSIONS.ADMINISTRATION,
        iconComponent: {name: 'cil-cog'},
        children: [
            {
                key: 'menu.administration-app-items',
                name: 'Администрирование приложения',
                url: '/administration/app-items'
            }, {
                key: 'menu.administration-action-log',
                name: 'Журналирование',
                url: '/administration/action-log'
            },
            {
                key: 'menu.file-export',
                name: 'Выгрузка через файл',
                url: '/file-export',
                itemCode: Permissions.PERMISSIONS.FILE_EXPORT,
                // iconComponent: {name: 'cil-data-transfer-down'}
            }, {
                key: 'menu.database_upadate',
                name: 'Обновление базы',
                url: '/administration/db-update'
            }
        ]
    }
];
