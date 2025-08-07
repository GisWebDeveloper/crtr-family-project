import { Component, OnInit } from '@angular/core';
import {KandasFamilyTzhsMonitoring} from "../../../models/report/kandas-fam-tzhs-mon/kandas-family-tzhs-monitoring";
import {Dictionary} from "../../../models/dictionary";
import {Region} from "../../../models/region";
import {ReportService} from "../../../services/report.service";
import {UtilService} from "../../../services/util.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {SegmentationService} from "../../../services/segmentation.service";
import {ActivatedRoute} from "@angular/router";
import {RegionDictionariesRequest} from "../../../models/segmentation/region-dictionaries-request";

@Component({
  selector: 'app-pereselency-tzhs',
  templateUrl: './pereselency-tzhs.component.html',
  styleUrls: ['./pereselency-tzhs.component.scss']
})
export class PereselencyTzhsComponent implements OnInit {

    visible = [true];
    dates: string[];
    data: KandasFamilyTzhsMonitoring;

    dictionary: Dictionary[];
    filteredDictionary: Dictionary[];
    dictionaryDistrict: Region[] = [];
    dictionaryRegion: any[] = [];

    filter: { statusId: number | null, districtId: number | null, regionId: number | null } = {
        statusId: 1111,
        districtId: null,
        regionId: null
    };

    constructor(public reportService: ReportService,
                public utilService: UtilService,
                private dictionaryService: DictionaryService,
                private segmentationService: SegmentationService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initDictionaries();
    }

    public search() {
        this.reportService.getReportKandasFamilyTzhsMonitoring(this.filter).subscribe({
            next: response => {
                this.dates = response.dates;
                this.data = response;
                this.filteredDictionary = this.dictionary.filter(temp => this.data.data.hasOwnProperty(temp.id));
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    initDictionaries() {
        this.dictionaryService.getReportKandasFamTzhsMonitoringDictionary().subscribe({
            next: response => {
                this.dictionary = response;
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
        let request = new RegionDictionariesRequest();
        this.segmentationService.getRegionDictionaries(request).subscribe({
            next: response => {
                const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
                this.dictionaryRegion = this.utilService.sortArray(response.regionList || [], nameField);
                this.dictionaryDistrict = this.utilService.sortArray(response.districtList || [], nameField);
                if (this.dictionaryRegion.length === 1) {
                    this.filter.regionId = this.dictionaryRegion[0].id;
                }
                if (this.dictionaryDistrict.length === 1) {
                    this.filter.districtId = this.dictionaryDistrict[0].id;
                }
                this.search();
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    getRegionDictionary() {
        if (this.filter.districtId) {
            this.filter.regionId = null;
            let request = new RegionDictionariesRequest();
            request.districtId = this.filter.districtId;
            this.segmentationService.getRegionDictionaries(request).subscribe(
                response => {
                    const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
                    this.dictionaryRegion = this.utilService.sortArray(response.regionList || [], nameField);
                    if (this.dictionaryRegion.length === 1) {
                        this.filter.regionId = this.dictionaryRegion[0].id;
                    }
                }, errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            )
        }
    }

    getValue(nameId: number, date: string, tzhsName: string) {
        if (!this.data.data.hasOwnProperty(nameId)) {
            return undefined;
        }
        if (!this.data.data[nameId].hasOwnProperty(date)) {
            return undefined;
        }
        switch (tzhsName) {
            case 'C':
                return this.data.data[nameId][date][0].tc;
            case 'D':
                return this.data.data[nameId][date][0].td;
            case 'E':
                return this.data.data[nameId][date][0].te;
            case 'V':
                return this.data.data[nameId][date][0].vse;
            default:
                return undefined;
        }
    }

    getValueDifference(nameId: number, dateIndex: number, tzhsName: string) {
        if (!this.data.data.hasOwnProperty(nameId)) {
            return undefined;
        }
        if (!this.data.data[nameId].hasOwnProperty(this.dates[dateIndex])) {
            return undefined;
        }
        if (!this.data.data[nameId].hasOwnProperty(this.dates[dateIndex - 1])) {
            return undefined;
        }
        switch (tzhsName) {
            case 'C':
                return this.data.data[nameId][this.dates[dateIndex]][0].tc - this.data.data[nameId][this.dates[dateIndex - 1]][0].tc;
            case 'D':
                return this.data.data[nameId][this.dates[dateIndex]][0].td - this.data.data[nameId][this.dates[dateIndex - 1]][0].td;
            case 'E':
                return this.data.data[nameId][this.dates[dateIndex]][0].te - this.data.data[nameId][this.dates[dateIndex - 1]][0].te;
            default:
                return undefined;
        }
    }

    resetFilters() {
        if (this.dictionaryDistrict.length === 1 && this.dictionaryRegion.length !== 1) {
            this.filter.regionId = null;
        } else if (this.dictionaryDistrict.length !== 1) {
            this.filter.districtId = null;
            this.filter.regionId = null;
        }
    }

    getTableLabel() {
        return 'kandas-tzhs.label2';
    }

}
