import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FamilyMember} from "../../../models/family/family-member";
import {UtilService} from "../../../services/util.service";
import {ChartConfiguration} from "chart.js";
import {AkimService} from "../../../services/akim.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-akim-stat-graph',
    templateUrl: './akim-stat-graph.component.html',
    styleUrls: ['./akim-stat-graph.component.scss']
})
export class AkimStatGraphComponent implements OnInit, OnChanges, OnDestroy {

    @Input() eventShowGraph: EventEmitter<{ param: string, label: string, xLabel: string, regionId?: number }>;

    @Input() type: string = '';

    regionId?: number;
    label: string = 'akim-page.stat.gbdfl'
    familyMember: FamilyMember;
    result: any[];
    private subscription: Subscription;
    public graphName: string = "ГБД ФЛ";
    public lineChartLabels: Array<any> = [];

    public chartData: Array<number> = [];
    public datasets: Array<any> = [
        {
            data: this.chartData,
            label: this.graphName,
            borderColor: '#FEE74C',
            backgroundColor: 'rgba(255,253,240,0.5)',
            fill: true,
            order: 1,

            // Point styling to match the image
            pointBackgroundColor: '#1F98EA',              // Blue fill color matching the image
            pointBorderColor: 'white',              // No visible border (the effect is created differently)
            pointBorderWidth: 2,
            pointRadius: 5,                               // 8px diameter = 4px radius

            // Create the outer ring effect with hover styling
            pointHoverBackgroundColor: 'white',         // Same blue on hover
            pointHoverBorderColor: '#1F98EA',             // Same blue for the outer ring
            pointHoverBorderWidth: 1,                     // Creates the ring effect
            pointHoverRadius: 10,                          // Larger hover area with ring

            // Alternative: you can use a custom point style
            pointStyle: 'circle'
        }
    ];
    private labelParameters: { param: string; label: string; xLabel: string };

    constructor(private utilService: UtilService,
                private akimService: AkimService) {
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
        this.akimService.getAkimStatHistory({type: this.type ? this.type : 'WEEKLY', regionId: this.regionId}).subscribe({
            next: result => {
                this.result = result;
                this.chartData = result.map(temp => temp.cntMem);
                this.datasets[0].data = this.chartData;
                this.lineChartLabels = result.map(temp => temp.dateFrom);
                this.updateLabel(this.labelParameters)
            }, error: err => {
                this.utilService.notifyError(this.utilService.getErrorMessage(err));
            }
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type']) {
            this.getData();
        }
    }

    // point = {
    //     backgroundColor: '#1F98EA',              // Blue fill color matching the image
    //     borderColor: 'white',              // No visible border (the effect is created differently)
    //     borderWidth: 2,
    //     radius: 5,                               // 8px diameter = 4px radius
    //
    //     // Create the outer ring effect with hover styling
    //     hoverBackgroundColor: 'white',         // Same blue on hover
    //     hoverBorderColor: '#1F98EA',             // Same blue for the outer ring
    //     hoverBorderWidth: 1,                     // Creates the ring effect
    //     hoverRadius: 10,                          // Larger hover area with ring
    // }

    public lineChartOptions: ChartConfiguration['options'] = {
        maintainAspectRatio: false,
        responsive: true,
        borderColor: '#FEE74C',
        backgroundColor: 'rgba(255,253,240,0.5)',
        // fill: true,
        elements: {
            line: {
                tension: 0.3
            },
            // point: {
            //     backgroundColor: '#1F98EA',              // Blue fill color matching the image
            //     borderColor: 'white',              // No visible border (the effect is created differently)
            //     borderWidth: 2,
            //     radius: 5,                               // 8px diameter = 4px radius
            //
            //     // Create the outer ring effect with hover styling
            //     hoverBackgroundColor: 'white',         // Same blue on hover
            //     hoverBorderColor: '#1F98EA',             // Same blue for the outer ring
            //     hoverBorderWidth: 1,                     // Creates the ring effect
            //     hoverRadius: 10,                          // Larger hover area with ring
            // }
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
            filler: {
                propagate: false
            }
        }
    };


    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    updateLabel(data: { param: string; label: string; xLabel: string }) {
        if (data) {
            if (this.result) {
                this.chartData = this.result.map(temp => temp[data.param]);
            }
            // @ts-ignore
            this.datasets = [
                {
                    data: this.chartData,
                    label: this.utilService.getTranslationValue(data.label),
                    borderColor: '#FEE74C',
                    backgroundColor: 'rgba(255,253,240,0.5)',
                    fill: true,
                    pointBackgroundColor: '#1F98EA',              // Blue fill color matching the image
                    pointBorderColor: 'white',              // No visible border (the effect is created differently)
                    pointBorderWidth: 2,
                    pointRadius: 5,                               // 8px diameter = 4px radius

                    // Create the outer ring effect with hover styling
                    pointHoverBackgroundColor: 'white',         // Same blue on hover
                    pointHoverBorderColor: '#1F98EA',             // Same blue for the outer ring
                    pointHoverBorderWidth: 1,                     // Creates the ring effect
                    pointHoverRadius: 10,                          // Larger hover area with ring

                    // Alternative: you can use a custom point style
                    pointStyle: 'circle'
                }
            ];
            // borderColor: '#FEE74C',
            //     backgroundColor: 'rgba(255,253,240,0.5)',
            //     fill: true,
            this.lineChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                borderColor: '#FEE74C',
                backgroundColor: 'rgba(255,253,240,0.5)',

                elements: {
                    line: {
                        tension: 0.3
                    },
                    // point: {
                    //     backgroundColor: '#1F98EA',              // Blue fill color matching the image
                    //     borderColor: 'white',              // No visible border (the effect is created differently)
                    //     borderWidth: 2,
                    //     radius: 5,                               // 8px diameter = 4px radius
                    //
                    //     // Create the outer ring effect with hover styling
                    //     hoverBackgroundColor: 'white',         // Same blue on hover
                    //     hoverBorderColor: '#1F98EA',             // Same blue for the outer ring
                    //     hoverBorderWidth: 1,                     // Creates the ring effect
                    //     hoverRadius: 10,                          // Larger hover area with ring
                    // }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: this.utilService.getTranslationValue(data.xLabel),
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
                }
            }
        }
    }

}
