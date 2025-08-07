import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UtilService} from "../../../../services/util.service";
import {ChartConfiguration} from "chart.js";
import {FamilyCategoryHistory} from "../../../../models/family/family-category-history";
import {FamilyMember} from "../../../../models/family/family-member";

@Component({
    selector: 'app-family-tzhs-history-graph',
    templateUrl: './family-tzhs-history-graph.component.html',
    styleUrls: ['./family-tzhs-history-graph.component.scss']
})
export class FamilyTzhsHistoryGraphComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<{
        familyCategoryHistoryList: Array<FamilyCategoryHistory>,
        familyMember: FamilyMember
    }>;

    visible: boolean = false;
    familyCategoryHistoryList: Array<FamilyCategoryHistory>;
    familyMember: FamilyMember;
    tzhsValues = ['A', 'B', 'C', 'D', 'E']
    public graphName: string = "Динамика благосостояния";
    public lineChartLabels: Array<any> = [];

    public chartData: Array<number> = [];
    public datasets: Array<any> = [
        {
            data: this.chartData,
            label: this.graphName
        }
    ];

    constructor(private utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventShowModal.subscribe(data => {
            this.familyCategoryHistoryList = data.familyCategoryHistoryList;
            this.familyMember = data.familyMember;
            this.chartData = this.familyCategoryHistoryList.map(temp => this.tzhsValues.indexOf(temp.category) + 1);
            this.datasets[0].data = this.chartData;
            this.lineChartLabels = this.familyCategoryHistoryList.map(temp => temp.dateFrom);
            this.visible = true;
        })
    }

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Категории',
                    font: {
                        weight: 'bold'
                    }
                },
                reverse: true,
                max: 6,
                min: 0,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        switch (value) {
                            case 1:
                                return 'A';
                            case 2:
                                return 'B';
                            case 3:
                                return 'C';
                            case 4:
                                return 'D';
                            case 5:
                                return 'E';
                            default:
                                return '';
                        }
                    }
                }
            },

            x: {
                title: {
                    display: true,
                    text: 'Дата сборки',
                    font: {
                        weight: 'bold'
                    }
                }
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label(tooltipItem): string | string[] {
                        const tzhs = tooltipItem.parsed.y;
                        const tzhses = ['A', 'B', 'C', 'D', 'E'];
                        return 'Категория ' + tzhses[tzhs - 1];
                    }
                }
            },
            datalabels: {
                display: true,
                align: 'top',
                anchor: 'end',
                //color: "#2756B3",
                color: "#222",

                font: {
                    family: 'FontAwesome',
                    size: 14
                },

            },
        },

    };


    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }


    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }
}
