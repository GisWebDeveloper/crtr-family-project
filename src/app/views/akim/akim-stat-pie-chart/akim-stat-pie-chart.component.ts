import {Component, EventEmitter, Input, OnInit, SimpleChanges} from '@angular/core';
import {FamilyMember} from "../../../models/family/family-member";
import {UtilService} from "../../../services/util.service";
import {AkimService} from "../../../services/akim.service";
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-akim-stat-pie-chart',
  templateUrl: './akim-stat-pie-chart.component.html',
  styleUrls: ['./akim-stat-pie-chart.component.scss']
})
export class AkimStatPieChartComponent implements OnInit {
    public doughnutChartType: ChartType = 'doughnut';

    // Chart data with three segments
    public doughnutChartData: ChartData<'doughnut'> = {
        labels: ['Section 1', 'Section 2', 'Section 3'],
        datasets: [
            {
                data: [49, 48, 7], // Adjust these values to match your desired proportions
                backgroundColor: [
                    '#1a3a6d', // Dark blue
                    '#98c3e6', // Light blue
                    '#fee05c'  // Yellow
                ],
                borderWidth: 0,
                borderRadius: 30,
                // Optional: if you want spacing between segments
                spacing: 10
            }
        ]
    };

    // Chart options
    public doughnutChartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: true,
        // cutout: '60%', // Controls the size of the hole in the middle
        // circumference: 180, // Creates a semi-circle (180 degrees instead of 360)
        // rotation: 180, // Rotates the start position (270 degrees = starts at bottom)
        plugins: {
            legend: {
                display: false // Hide the legend
            },
            tooltip: {
                enabled: false
            }
        }
    };

    // Optional: Custom plugin to make rounded corners
    public doughnutChartPlugins = [{
        id: 'roundedCorners',
        beforeDraw: (chart: any) => {
            if (chart.config.options.roundedCorners !== false) {
                const ctx = chart.ctx;
                const datasets = chart.data.datasets;

                // For each dataset/segment
                datasets.forEach((dataset: any, i: number) => {
                    const meta = chart.getDatasetMeta(i);

                    // For each arc/segment
                    meta.data.forEach((arc: any) => {
                        arc.roundedCornersRadius = 10; // Adjust roundness as needed
                    });
                });
            }
        }
    }];

    constructor() { }

    ngOnInit(): void { }

}
