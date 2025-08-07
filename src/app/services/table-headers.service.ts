import {Injectable} from '@angular/core';
import {TableHeaderConfig} from "../models/dynamic-table/table-header-config";
import {UtilService} from "./util.service";

@Injectable({
    providedIn: 'root'
})
export class TableHeadersService {

    private readonly S4010: TableHeaderConfig = {
        numberFormatColumns: ['cnt3', 'cnt4', 'cnt5', 'cnt6'],
        colorDataColumn: ['cnt8'],
        showModalColumns: ['cnt5'],
        rows: [
            {
                cells: [
                    {
                        label: '#',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.region',
                        rowspan: 2,
                        class: {'region-column': true}
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-3-4',
                        colspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-5-6',
                        colspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-7',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-8',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-9',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-10',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-11',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-12',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-13',
                        rowspan: 2
                    },
                ]
            },
            {
                cells: [
                    {
                        label: 'report-page.ranking.poverty.cnt-3'
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-4'
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-5'
                    },
                    {
                        label: 'report-page.ranking.poverty.cnt-6'
                    }
                ]
            },
            {
                cells: [
                    {
                        label: 1
                    },
                    {
                        label: 2
                    },
                    {
                        label: 3
                    },
                    {
                        label: 4
                    },
                    {
                        label: 5
                    },
                    {
                        label: 6
                    },
                    {
                        label: 7
                    },
                    {
                        label: 8
                    },
                    {
                        label: 9
                    },
                    {
                        label: 10
                    },
                    {
                        label: 11
                    },
                    {
                        label: 12
                    },
                    {
                        label: 13
                    }
                ]
            }
        ]
    };

    private readonly S4011: TableHeaderConfig = {
        numberFormatColumns: ['cnt3', 'cnt4'],
        colorDataColumn: ['cnt6'],
        showModalColumns: ['cnt4'],
        rows: [
            {
                cells: [
                    {
                        label: '#'
                    },
                    {
                        label: 'report-page.ranking.unemployed.region',
                        class: {'region-column': true}
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-3',
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-4',
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-5',
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-6',
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-7'
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-8'
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-9'
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-10'
                    },
                    {
                        label: 'report-page.ranking.unemployed.cnt-11'
                    }
                ]
            },
            {
                cells: [
                    {
                        label: 1
                    },
                    {
                        label: 2
                    },
                    {
                        label: 3
                    },
                    {
                        label: 4
                    },
                    {
                        label: 5
                    },
                    {
                        label: 6
                    },
                    {
                        label: 7
                    },
                    {
                        label: 8
                    },
                    {
                        label: 9
                    },
                    {
                        label: 10
                    },
                    {
                        label: 11
                    }
                ]
            }
        ]
    };

    private readonly S4012: TableHeaderConfig = {
        numberFormatColumns: ['cnt3', 'cnt4'],
        colorDataColumn: ['cnt6'],
        showModalColumns: ['cnt4'],
        rows: [
            {
                cells: [
                    {
                        label: '#'
                    },
                    {
                        label: 'report-page.ranking.unoccupied.region',
                        class: {'region-column': true}
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-3',
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-4',
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-5',
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-6',
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-7'
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-8'
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-9'
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-10'
                    },
                    {
                        label: 'report-page.ranking.unoccupied.cnt-11'
                    }
                ]
            },
            {
                cells: [
                    {
                        label: 1
                    },
                    {
                        label: 2
                    },
                    {
                        label: 3
                    },
                    {
                        label: 4
                    },
                    {
                        label: 5
                    },
                    {
                        label: 6
                    },
                    {
                        label: 7
                    },
                    {
                        label: 8
                    },
                    {
                        label: 9
                    },
                    {
                        label: 10
                    },
                    {
                        label: 11
                    }
                ]
            }
        ]
    };

    private readonly S4013: TableHeaderConfig = {
        numberFormatColumns: ['cnt3', 'cnt4', 'cnt5'],
        rows: [
            {
                cells: [
                    {
                        label: '#',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.region',
                        rowspan: 2,
                        class: {'region-column': true}
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-3-4',
                        colspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-5',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-6-7',
                        colspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-8-9',
                        colspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-10-11',
                        colspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-12',
                        rowspan: 2
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-13',
                        rowspan: 2
                    }
                ],
            },
            {
                cells: [
                    {
                        label: 'report-page.ranking.combined.cnt-3',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-4',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-6',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-7',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-8',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-9',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-10',
                    },
                    {
                        label: 'report-page.ranking.combined.cnt-11',
                    }
                ]
            },
            {
                cells: [
                    {
                        label: 1
                    },
                    {
                        label: 2
                    },
                    {
                        label: 3
                    },
                    {
                        label: 4
                    },
                    {
                        label: 5
                    },
                    {
                        label: 6
                    },
                    {
                        label: 7
                    },
                    {
                        label: 8
                    },
                    {
                        label: 9
                    },
                    {
                        label: 10
                    },
                    {
                        label: 11
                    },
                    {
                        label: 12
                    },
                    {
                        label: 13
                    }
                ]
            }
        ]
    };

    constructor(private utilService: UtilService) {
    }

    public getTableHeader(param: string) {
        return this.utilService.getObjectFieldValue(this, param);
    }

}
