import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ReportRegionRanking} from "../../../models/report/report-region-rating/report-region-ranking";
import {RegionStatistics} from "../../../models/region-statistics/region-statistics";
import {UtilService} from "../../../services/util.service";

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {PopulationAgeStatistics} from "../../../models/region-statistics/population-age-statistics";


@Component({
    selector: 'app-region-statistics-graph',
    templateUrl: './region-statistics-graph.component.html',
    styleUrls: ['./region-statistics-graph.component.scss']
})
export class RegionStatisticsGraphComponent implements OnInit {

    @Input() eventGetData: EventEmitter<{
        data: ReportRegionRanking<RegionStatistics> |
            {
                manAge: ReportRegionRanking<PopulationAgeStatistics>,
                womanAge: ReportRegionRanking<PopulationAgeStatistics>,
                field: string
            },
        type: string
    }>

    type: string;

    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    constructor(private utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventGetData.subscribe(result => {
            this.type = result.type;
            if ('manAge' in result.data) {
                this.updateAgeData(result.data)
            } else {
                if ('total' in result.data)
                    this.updateData(result.data, this.type);
            }
        });
    }

    private updateAgeData(data: { manAge: ReportRegionRanking<PopulationAgeStatistics>; womanAge: ReportRegionRanking<PopulationAgeStatistics>; field: string }) {
        this.barChartData.datasets[0].label = this.utilService.getTranslationValue('region-statistics.man');
        this.barChartData.datasets[1].label = this.utilService.getTranslationValue('region-statistics.woman');
        this.barAgeChartData.labels = data.manAge.regionRatingList.map(temp => temp.regionNameRu);
        this.barAgeChartData.datasets[0].data = data.manAge.regionRatingList.map(temp => this.utilService.getObjectFieldValue(temp, data.field));
        this.barAgeChartData.datasets[1].data = data.womanAge.regionRatingList.map(temp => this.utilService.getObjectFieldValue(temp, data.field));
        this.chart?.update();
    }

    private updateData(data: ReportRegionRanking<RegionStatistics>, type: string) {
        this.barChartData.labels = data.regionRatingList.map(temp => temp.regionNameRu);
        if (type === 'population') {
            this.barChartData.datasets[0].label = this.utilService.getTranslationValue('region-statistics.man');
            this.barChartData.datasets[1].label = this.utilService.getTranslationValue('region-statistics.woman');
            this.barChartData.datasets[2].label = this.utilService.getTranslationValue('region-statistics.child');
            this.barChartData.datasets[0].data = data.regionRatingList.map(temp => temp.cntMan);
            this.barChartData.datasets[1].data = data.regionRatingList.map(temp => temp.cntWoman);
            this.barChartData.datasets[2].data = data.regionRatingList.map(temp => temp.cntChild);
        } else if (type === 'uniq') {
            this.barChartData.datasets[0].label = this.utilService.getTranslationValue('region-statistics.family');
            this.barChartData.datasets[1].label = this.utilService.getTranslationValue('region-statistics.member');
            this.barChartData.datasets[2].label = this.utilService.getTranslationValue('region-statistics.uniq');
            this.barChartData.datasets[0].data = data.regionRatingList.map(temp => temp.cntFam);
            this.barChartData.datasets[1].data = data.regionRatingList.map(temp => temp.cntMem);
            this.barChartData.datasets[2].data = data.regionRatingList.map(temp => temp.cnt);
        }
        this.chart?.update();
    }

    public barChartOptions: ChartConfiguration['options'] = {
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            x: {},
            y: {
                min: 0,
            },
        },
        plugins: {
            legend: {
                display: true
            },
            datalabels: {
                anchor: 'center',
                align: 'center',
                rotation : 90
            }
        }

    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [DataLabelsPlugin];

    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [
            {data: [], label: 'Мужчины'},
            {data: [], label: 'Женшины'},
            {data: [], label: 'Дети'}
        ],
    };

    public barAgeChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [
            {data: [], label: 'Мужчины'},
            {data: [], label: 'Женшины'}
        ]
    };
}
