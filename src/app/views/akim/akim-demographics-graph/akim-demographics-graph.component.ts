import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {AkimService} from "../../../services/akim.service";
import {ChartConfiguration, ChartEvent, LegendItem} from "chart.js";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-akim-demographics-graph',
    templateUrl: './akim-demographics-graph.component.html',
    styleUrls: ['./akim-demographics-graph.component.scss']
})
export class AkimDemographicsGraphComponent implements OnInit, OnDestroy {

    @Input() eventShowGraph: EventEmitter<{ param: string, label: string, index: number, regionId?: number }>;
    @Input() type: string = '';

    private subscription: Subscription;

    regionId?: number;
    result: any[];
    public lineChartLabels: Array<any> = [];

    public chartDataSusnPens: Array<number> = [];
    public chartDataSusnVov: Array<number> = [];
    public chartDataSusnUk: Array<number> = [];
    public chartDataSusnInv: Array<number> = [];
    public chartDataSusnInvChild: Array<number> = [];
    public chartDataSusnSirot: Array<number> = [];
    public chartDataSusnMng: Array<number> = [];
    public chartDataSusnAsp: Array<number> = [];
    public chartDataSusnKandas: Array<number> = [];

    public chartDataWoman: Array<number> = [];
    public chartDataMan: Array<number> = [];
    public chartDataChild: Array<number> = [];

    public chartData0_18: Array<number> = [];
    public chartData18_35: Array<number> = [];
    public chartData35_45: Array<number> = [];
    public chartData45_65: Array<number> = [];
    public chartData65: Array<number> = [];

    public chartDataTrud: Array<number> = [];
    public chartDataIp: Array<number> = [];
    public chartDataWork: Array<number> = [];
    public chartDataBezrab: Array<number> = [];

    public chartDataCredit: Array<number> = [];
    public chartDataCreditDolg: Array<number> = [];

    public chartDataOsms: Array<number> = [];
    public chartDataRpn: Array<number> = [];

    public chartDataSchool: Array<number> = [];
    public chartDataSadik: Array<number> = [];
    public chartDataTipo: Array<number> = [];
    public chartDataUniver: Array<number> = [];

    // Define line colors based on the specified palette
    private lineColors = [
        '#FEE74B',  // Primary yellow
        '#0c2746',  // Primary dark blue
        '#8BC2DE',  // Primary light blue
        '#e4cb43',  // Yellow variant 1
        '#183d64',  // Dark blue variant 1
        '#5da7cc',  // Light blue variant 1
        '#cbb039',  // Yellow variant 2
        '#24517e',  // Dark blue variant 2
        '#a0d0e6'   // Light blue variant 2
    ];

    public datasetsPopulation: Array<any> = [
        {
            data: this.chartDataSusnPens,
            label: "Женщины",
            borderColor: this.lineColors[0],
            backgroundColor: 'rgba(254,231,75,0.5)',
            fill: true,
            order: 1,
            pointBackgroundColor: this.lineColors[0],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[0],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartDataSusnVov,
            label: "Мужчины",
            borderColor: this.lineColors[1],
            backgroundColor: 'rgba(12,39,70,0.1)',
            fill: true,
            order: 2,
            pointBackgroundColor: this.lineColors[1],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[1],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnUk,
            label: "Дети",
            borderColor: this.lineColors[2],
            backgroundColor: 'rgba(139,194,222,0.1)',
            fill: true,
            order: 3,
            pointBackgroundColor: this.lineColors[2],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[2],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];

    public datasetsAge: Array<any> = [
        {
            data: this.chartData0_18,
            label: "0 - 18",
            borderColor: this.lineColors[3],
            backgroundColor: 'rgba(228,203,67,0.1)',
            fill: true,
            order: 4,
            pointBackgroundColor: this.lineColors[3],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[3],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartData18_35,
            label: "18 - 35",
            borderColor: this.lineColors[4],
            backgroundColor: 'rgba(24,61,100,0.1)',
            fill: true,
            order: 5,
            pointBackgroundColor: this.lineColors[4],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[4],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartData35_45,
            label: "35 - 45",
            borderColor: this.lineColors[5],
            backgroundColor: 'rgba(93,167,204,0.1)',
            fill: true,
            order: 6,
            pointBackgroundColor: this.lineColors[5],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[5],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartData45_65,
            label: "45 - 65",
            borderColor: this.lineColors[6],
            backgroundColor: 'rgba(203,176,57,0.1)',
            fill: true,
            order: 7,
            pointBackgroundColor: this.lineColors[6],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[6],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartData65,
            label: "65 -",
            borderColor: this.lineColors[7],
            backgroundColor: 'rgba(36,81,126,0.1)',
            fill: true,
            order: 8,
            pointBackgroundColor: this.lineColors[7],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[7],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];

    public datasetsSusn: Array<any> = [
        {
            data: this.chartDataSusnPens,
            label: "Пенсионеры",
            borderColor: this.lineColors[0],
            backgroundColor: 'rgba(254,231,75,0.5)',
            fill: true,
            order: 1,
            pointBackgroundColor: this.lineColors[0],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[0],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartDataSusnVov,
            label: "Участники ВОВ",
            borderColor: this.lineColors[1],
            backgroundColor: 'rgba(12,39,70,0.1)',
            fill: true,
            order: 2,
            pointBackgroundColor: this.lineColors[1],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[1],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnUk,
            label: "Семьи погибших (умерших) военных",
            borderColor: this.lineColors[2],
            backgroundColor: 'rgba(139,194,222,0.1)',
            fill: true,
            order: 3,
            pointBackgroundColor: this.lineColors[2],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[2],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnInv,
            label: "ЛСИ I или II группы",
            borderColor: this.lineColors[3],
            backgroundColor: 'rgba(228,203,67,0.1)',
            fill: true,
            order: 4,
            pointBackgroundColor: this.lineColors[3],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[3],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnInvChild,
            label: "Семьи, воспитывающие детей с инвалидностью",
            borderColor: this.lineColors[4],
            backgroundColor: 'rgba(24,61,100,0.1)',
            fill: true,
            order: 5,
            pointBackgroundColor: this.lineColors[4],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[4],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnSirot,
            label: "Сироты",
            borderColor: this.lineColors[5],
            backgroundColor: 'rgba(93,167,204,0.1)',
            fill: true,
            order: 6,
            pointBackgroundColor: this.lineColors[5],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[5],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnMng,
            label: "Многодетные семьи и награжденные многодетные матери",
            borderColor: this.lineColors[6],
            backgroundColor: 'rgba(203,176,57,0.1)',
            fill: true,
            order: 7,
            pointBackgroundColor: this.lineColors[6],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[6],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnAsp,
            label: "Получатели АСП",
            borderColor: this.lineColors[7],
            backgroundColor: 'rgba(36,81,126,0.1)',
            fill: true,
            order: 8,
            pointBackgroundColor: this.lineColors[7],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[7],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnKandas,
            label: "Кандасы",
            borderColor: this.lineColors[8],
            backgroundColor: 'rgba(160,208,230,0.1)',
            fill: true,
            order: 9,
            pointBackgroundColor: this.lineColors[8],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[8],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];

    public datasetsZanyat: Array<any> = [
        {
            data: this.chartDataSusnSirot,
            label: "Трудоспособные",
            borderColor: this.lineColors[5],
            backgroundColor: 'rgba(93,167,204,0.1)',
            fill: true,
            order: 6,
            pointBackgroundColor: this.lineColors[5],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[5],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartDataSusnMng,
            label: "ИП",
            borderColor: this.lineColors[6],
            backgroundColor: 'rgba(203,176,57,0.1)',
            fill: true,
            order: 7,
            pointBackgroundColor: this.lineColors[6],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[6],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnAsp,
            label: "Наемные работники",
            borderColor: this.lineColors[7],
            backgroundColor: 'rgba(36,81,126,0.1)',
            fill: true,
            order: 8,
            pointBackgroundColor: this.lineColors[7],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[7],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnKandas,
            label: "Безработные",
            borderColor: this.lineColors[8],
            backgroundColor: 'rgba(160,208,230,0.1)',
            fill: true,
            order: 9,
            pointBackgroundColor: this.lineColors[8],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[8],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];

    public datasetsCredit: Array<any> = [
        {
            data: this.chartDataSusnPens,
            label: "Количество граждан имеющих кредиты",
            borderColor: this.lineColors[0],
            backgroundColor: 'rgba(254,231,75,0.5)',
            fill: true,
            order: 1,
            pointBackgroundColor: this.lineColors[0],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[0],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartDataSusnVov,
            label: "Количество граждан имеющих просроченную задолженность",
            borderColor: this.lineColors[1],
            backgroundColor: 'rgba(12,39,70,0.1)',
            fill: true,
            order: 2,
            pointBackgroundColor: this.lineColors[1],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[1],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];

    public datasetsZdrav: Array<any> = [
        {
            data: this.chartDataSusnPens,
            label: "Застраховано",
            borderColor: this.lineColors[0],
            backgroundColor: 'rgba(254,231,75,0.5)',
            fill: true,
            order: 1,
            pointBackgroundColor: this.lineColors[0],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[0],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartDataSusnVov,
            label: "Прикрепоение",
            borderColor: this.lineColors[1],
            backgroundColor: 'rgba(12,39,70,0.1)',
            fill: true,
            order: 2,
            pointBackgroundColor: this.lineColors[1],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[1],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];

    public datasetsObraz: Array<any> = [
        {
            data: this.chartDataSusnSirot,
            label: "Школа",
            borderColor: this.lineColors[5],
            backgroundColor: 'rgba(93,167,204,0.1)',
            fill: true,
            order: 6,
            pointBackgroundColor: this.lineColors[5],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[5],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: false
        },
        {
            data: this.chartDataSusnMng,
            label: "Дошкольные",
            borderColor: this.lineColors[6],
            backgroundColor: 'rgba(203,176,57,0.1)',
            fill: true,
            order: 7,
            pointBackgroundColor: this.lineColors[6],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[6],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnAsp,
            label: "ТиПО",
            borderColor: this.lineColors[7],
            backgroundColor: 'rgba(36,81,126,0.1)',
            fill: true,
            order: 8,
            pointBackgroundColor: this.lineColors[7],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[7],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        },
        {
            data: this.chartDataSusnKandas,
            label: "Университет",
            borderColor: this.lineColors[8],
            backgroundColor: 'rgba(160,208,230,0.1)',
            fill: true,
            order: 9,
            pointBackgroundColor: this.lineColors[8],
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: this.lineColors[8],
            pointHoverBorderWidth: 1,
            pointHoverRadius: 10,
            pointStyle: 'circle',
            hidden: true
        }
    ];
    labelParameters: { param: string; label: string; index: number };
    public showChart: boolean = true;

    constructor(private utilService: UtilService,
                private akimService: AkimService,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.subscription = this.eventShowGraph.subscribe(data => {
            this.labelParameters = data;
            this.regionId = data.regionId;
            this.updateLabel(data);
            this.getData();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getData() {
        this.akimService.getAkimStatHistory2({
            type: this.type ? this.type : 'WEEKLY',
            regionId: this.regionId
        }).subscribe({
            next: result => {
                this.result = result;

                // Map data for all 9 lines
                this.chartDataSusnPens = result.map(temp => temp.cntMem);

                if (this.labelParameters.index === 5) {
                    this.chartDataWoman = result.map(temp => temp.cntMen);
                    this.chartDataMan = result.map(temp => temp.cntWoman);
                    this.chartDataChild = result.map(temp => temp.cntChild);

                    this.datasetsPopulation[0].data = this.chartDataWoman;
                    this.datasetsPopulation[1].data = this.chartDataMan;
                    this.datasetsPopulation[2].data = this.chartDataChild;
                } else if (this.labelParameters.index === 6) {
                    this.chartDataSusnPens = result.map(temp => temp.cntSusnPens);
                    this.chartDataSusnVov = result.map(temp => temp.cntSusnVov);
                    this.chartDataSusnUk = result.map(temp => temp.cntSusnUk);
                    this.chartDataSusnInv = result.map(temp => temp.cntSusnInv);
                    this.chartDataSusnInvChild = result.map(temp => temp.cntSusnInvChild);
                    this.chartDataSusnSirot = result.map(temp => temp.cntSusnSirot);
                    this.chartDataSusnMng = result.map(temp => temp.cntSusnMng);
                    this.chartDataSusnAsp = result.map(temp => temp.cntSusnAsp);
                    this.chartDataSusnKandas = result.map(temp => temp.cntSusnKandas);

                    // Update dataset data
                    this.datasetsSusn[0].data = this.chartDataSusnPens;
                    this.datasetsSusn[1].data = this.chartDataSusnVov;
                    this.datasetsSusn[2].data = this.chartDataSusnUk;
                    this.datasetsSusn[3].data = this.chartDataSusnInv;
                    this.datasetsSusn[4].data = this.chartDataSusnInvChild;
                    this.datasetsSusn[5].data = this.chartDataSusnSirot;
                    this.datasetsSusn[6].data = this.chartDataSusnMng;
                    this.datasetsSusn[7].data = this.chartDataSusnAsp;
                    this.datasetsSusn[8].data = this.chartDataSusnKandas;

                } else if (this.labelParameters.index === 7) {
                    this.chartData0_18 = result.map(temp => temp.cnt_0_18);
                    this.chartData18_35 = result.map(temp => temp.cnt_18_35);
                    this.chartData35_45 = result.map(temp => temp.cnt_35_45);
                    this.chartData45_65 = result.map(temp => temp.cnt_45_65);
                    this.chartData65 = result.map(temp => temp.cnt_65);

                    this.datasetsAge[0].data = this.chartData0_18;
                    this.datasetsAge[1].data = this.chartData18_35;
                    this.datasetsAge[2].data = this.chartData35_45;
                    this.datasetsAge[3].data = this.chartData45_65;
                    this.datasetsAge[4].data = this.chartData65;
                } else if (this.labelParameters.index === 8) {
                    this.chartDataTrud = result.map(temp => temp.cntTrud);
                    this.chartDataIp = result.map(temp => temp.cntIp);
                    this.chartDataWork = result.map(temp => temp.cntWork);
                    this.chartDataBezrab = result.map(temp => temp.cntBezrab);

                    this.datasetsZanyat[0].data = this.chartDataTrud;
                    this.datasetsZanyat[1].data = this.chartDataIp;
                    this.datasetsZanyat[2].data = this.chartDataWork;
                    this.datasetsZanyat[3].data = this.chartDataBezrab;
                } else if (this.labelParameters.index === 9) {
                    this.chartDataOsms = result.map(temp => temp.cntOsms);
                    this.chartDataRpn = result.map(temp => temp.cntRpn);

                    this.datasetsZdrav[0].data = this.chartDataOsms;
                    this.datasetsZdrav[1].data = this.chartDataRpn;
                } else if (this.labelParameters.index === 10) {
                    this.chartDataSchool = result.map(temp => temp.cntSchool);
                    this.chartDataSadik = result.map(temp => temp.cntSadik);
                    this.chartDataTipo = result.map(temp => temp.cntTipo);
                    this.chartDataUniver = result.map(temp => temp.cntUniver);

                    this.datasetsObraz[0].data = this.chartDataSchool;
                    this.datasetsObraz[1].data = this.chartDataSadik;
                    this.datasetsObraz[2].data = this.chartDataTipo;
                    this.datasetsObraz[3].data = this.chartDataUniver;
                } else if (this.labelParameters.index === 11) {
                    this.chartDataCredit = result.map(temp => temp.cntCredit);
                    this.chartDataCreditDolg = result.map(temp => temp.cntCreditDolg);

                    this.datasetsCredit[0].data = this.chartDataCredit;
                    this.datasetsCredit[1].data = this.chartDataCreditDolg;
                }

                this.lineChartLabels = result.map(temp => temp.dateFrom);
                this.updateLabel(this.labelParameters);
            }, error: err => {
                this.utilService.notifyError(this.utilService.getErrorMessage(err));
            }
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type'] && this.labelParameters?.index) {
            this.getData();
        }
    }

    public lineChartOptions: ChartConfiguration['options'] = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 0.3
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Население',
                    font: {
                        weight: 'bold'
                    }
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Дата',
                    font: {
                        weight: 'bold'
                    }
                }
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                onClick: (e: ChartEvent, legendItem: LegendItem) => {
                    this.showDataSet(legendItem.datasetIndex);
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            },
            filler: {
                propagate: false
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    updateLabel(data: { param: string; label: string; index: number }) {
        if (data) {
            if (this.result) {
                if (data.index === 5) {
                    this.chartDataWoman = this.result.map(temp => temp.cntMen);
                    this.chartDataMan = this.result.map(temp => temp.cntWoman);
                    this.chartDataChild = this.result.map(temp => temp.cntChild);

                    this.datasetsPopulation[0].data = this.chartDataWoman;
                    this.datasetsPopulation[1].data = this.chartDataMan;
                    this.datasetsPopulation[2].data = this.chartDataChild;
                } else if (data.index === 6) {
                    this.chartDataSusnPens = this.result.map(temp => temp.cntSusnPens);
                    this.chartDataSusnVov = this.result.map(temp => temp.cntSusnVov);
                    this.chartDataSusnUk = this.result.map(temp => temp.cntSusnUk);
                    this.chartDataSusnInv = this.result.map(temp => temp.cntSusnInv);
                    this.chartDataSusnInvChild = this.result.map(temp => temp.cntSusnInvChild);
                    this.chartDataSusnSirot = this.result.map(temp => temp.cntSusnSirot);
                    this.chartDataSusnMng = this.result.map(temp => temp.cntSusnMng);
                    this.chartDataSusnAsp = this.result.map(temp => temp.cntSusnAsp);
                    this.chartDataSusnKandas = this.result.map(temp => temp.cntSusnKandas);

                    // Update dataset data
                    this.datasetsSusn[0].data = this.chartDataSusnPens;
                    this.datasetsSusn[1].data = this.chartDataSusnVov;
                    this.datasetsSusn[2].data = this.chartDataSusnUk;
                    this.datasetsSusn[3].data = this.chartDataSusnInv;
                    this.datasetsSusn[4].data = this.chartDataSusnInvChild;
                    this.datasetsSusn[5].data = this.chartDataSusnSirot;
                    this.datasetsSusn[6].data = this.chartDataSusnMng;
                    this.datasetsSusn[7].data = this.chartDataSusnAsp;
                    this.datasetsSusn[8].data = this.chartDataSusnKandas;

            }else if (data.index === 7) {
                    this.chartData0_18 = this.result.map(temp => temp.cnt_0_18);
                    this.chartData18_35 = this.result.map(temp => temp.cnt_18_35);
                    this.chartData35_45 = this.result.map(temp => temp.cnt_35_45);
                    this.chartData45_65 = this.result.map(temp => temp.cnt_45_65);
                    this.chartData65 = this.result.map(temp => temp.cnt_65);

                    this.datasetsAge[0].data = this.chartData0_18;
                    this.datasetsAge[1].data = this.chartData18_35;
                    this.datasetsAge[2].data = this.chartData35_45;
                    this.datasetsAge[3].data = this.chartData45_65;
                    this.datasetsAge[4].data = this.chartData65;
                } else {
                    this.chartDataSusnPens = this.result.map(temp => temp[data.param]);
                    this.datasetsSusn[0].data = this.chartDataSusnPens;
                    this.datasetsSusn[0].label = this.utilService.getTranslationValue(data.label);
                }
            }


        }
    }

    private showDataSet(index: number | undefined) {
        if (this.labelParameters.index === 5) {
            this.datasetsPopulation = this.datasetsPopulation.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        } else if (this.labelParameters.index === 6) {
            this.datasetsSusn = this.datasetsSusn.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        } else if (this.labelParameters.index === 7) {
            this.datasetsAge = this.datasetsAge.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        } else if (this.labelParameters.index === 8) {
            this.datasetsZanyat = this.datasetsZanyat.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        } else if (this.labelParameters.index === 9) {
            this.datasetsZdrav = this.datasetsZdrav.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        } else if (this.labelParameters.index === 10) {
            this.datasetsObraz = this.datasetsObraz.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        } else if (this.labelParameters.index === 11) {
            this.datasetsCredit = this.datasetsCredit.map((dataset, i) => ({
                ...dataset,
                hidden: i != index
            }));
        }
        this.cdRef.detectChanges()
    }
}
