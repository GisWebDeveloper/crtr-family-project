import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {SegmentationService} from "../../../services/segmentation.service";
import {SegmentationFilter} from "../../../models/segmentation/segmentation-filter";
import {SegmentationResponse} from "../../../models/segmentation/segmentation-response";
import {SegmentationStatItem} from "../../../models/segmentation/segmentation-stat-item";
import {TranslateService} from "@ngx-translate/core";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {Dictionary} from "../../../models/dictionary";

@Component({
    selector: 'app-segmentation-fc',
    templateUrl: './segmentation-fc.component.html',
    styleUrls: ['./segmentation-fc.component.scss']
})
export class SegmentationFcComponent implements OnInit {

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<StatItemDescription>();

    // 0. FILTER, 1. EXTENDED FILTER
    visible = [true, false];

    //dictionaryAccommodation: any[] = [];
    dictionaryAspOptions: any[] = [];
    dictionaryCreditOptions: any[] = [];
    dictionaryCriminalRecordOptions: any[] = [];
    dictionaryDisabledOptions: any[] = [];
    dictionaryDiseaseOptions: any[] = [];
    //dictionaryDistrict: any[] = [];
    //dictionaryDistrictOptions: any[] = [];
    dictionaryEducationOptions: any[] = [];
    dictionaryEmploymentOptions: any[] = [];
    dictionaryFamilyTzhs: Dictionary[] = [];
    dictionaryGrstOptions: any[];
    dictionaryIncomeOptions: any[] = [];
    dictionaryLandOptions: any[] = [];
    dictionaryLphOptions: any[];
    dictionaryRealEstateOptions: any[] = [];
    //dictionaryRegion: any[] = [];
    //dictionaryRegionOptions: any[] = [];
    dictionaryTransportOptions: any[] = [];
    dictionaryUlOptions: any[];
    dictionaryYesNo: any[] = [];

    filter: SegmentationFilter = new SegmentationFilter();
    filterDescription: string = '';

    params: {
        regionId: number | undefined,
        stat: Array<SegmentationStatItem>,
        statTotal: SegmentationStatItem
    }

    chartParams: {
        labels: string[],
        data: number[],
        filteredData: number[],
        total: number,
        filteredTotal: number
    }

    constructor(
        private dictionaryService: DictionaryService,
        private segmentationService: SegmentationService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.params = {
            regionId: undefined,
            stat: new Array<SegmentationStatItem>(),
            statTotal: new SegmentationStatItem()
        };
        this.chartParams = {labels: [], data: [], filteredData: [], total: 0, filteredTotal: 0};

        this.dictionaryService.getFamilyTzhsDictionary2().subscribe({
            next: response => {
                this.dictionaryFamilyTzhs = response || [];
                if (this.dictionaryFamilyTzhs) {
                    this.dictionaryFamilyTzhs.forEach(item => {
                        let label = item.nameRu, value = 0;
                        this.chartParams.labels.push(label);
                        this.chartParams.data.push(value);
                        this.chartParams.filteredData.push(value);
                    });

                    this.initDictionaries();
                    this.search();
                }
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    private initDictionaries() {

        //this.dictionaryAccommodation = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryAccommodation());
        this.dictionaryAspOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryAsp());
        this.dictionaryCreditOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryCredit());
        this.dictionaryCriminalRecordOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryCriminalRecord());
        this.dictionaryDisabledOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryDisabled2());
        this.dictionaryDiseaseOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryDisease());
        this.dictionaryEducationOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryEducation());
        this.dictionaryEmploymentOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryEmployment());
        this.dictionaryGrstOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryGrst());
        this.dictionaryIncomeOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryIncome());
        this.dictionaryLandOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryLand());
        this.dictionaryLphOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryLph());
        this.dictionaryRealEstateOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryRealEstate2());
        this.dictionaryTransportOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryTransport2());
        this.dictionaryUlOptions = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryUl());
        this.dictionaryYesNo = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getYesNoDictionary());

        /*
        this.segmentationService.getRegionDictionaries().subscribe({
            next: response => {
                //this.dictionaryDistrict = response.districtList;
                //this.dictionaryRegion = response.regionList;
                //this.dictionaryDistrictOptions = this.dictionaryService.listToSelectOptions(this.dictionaryDistrict, true);
                //this.dictionaryRegionOptions = this.dictionaryService.listToSelectOptions(this.dictionaryRegion, true);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });*/
    }

    search() {
        let filterRequest: any = this.filter;
        filterRequest.version = 2;
        this.filterDescription = '';
        if (this.filterHasValues()) {
            this.fillFilterDescription();
            this.segmentationService.getSegmentationStat(filterRequest).subscribe({
                next: segmentResponse => {
                    this.processSearchResponse(segmentResponse);
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        } else {
            this.segmentationService.getSegmentationStatAll(filterRequest).subscribe({
                next: segmentResponse => {
                    this.processSearchResponse(segmentResponse);
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        }
    }

    private processSearchResponse(response: SegmentationResponse) {


        let regionStat = response.regionStatList.filter(item => item.id == 0)[0];
        let filterStatList = response.filterStatList;

        this.params.stat = filterStatList.filter(item => item.id != 0);
        this.params.statTotal = filterStatList.filter(item => item.id == 0)[0];

        this.params.statTotal.total = this.utilService.getObjectFieldSum(this.params.statTotal, 'cnt');
        this.params.stat.forEach(stat => {
            stat.total = this.utilService.getObjectFieldSum(stat, 'cnt');
        });

        // FILL CHART DATA
        /*
        this.chartParams.data = [];
        this.chartParams.filteredData = [];
        this.dictionaryFamilyTzhs.forEach(item => {
            this.chartParams.data.push(regionStat['cnt' + item.id]);
            this.chartParams.filteredData.push(this.params.statTotal['cnt' + item.id]);
        });

        this.initChart();
        this.params.isLoaded = true;
        */
    }

    private filterHasValues() {
        let hasValues = false;
        Object.keys(this.filter).filter(key => {
            // @ts-ignore
            if (this.filter[key]) hasValues = true;
        });
        return hasValues;
    }

    showListModal(statItem: SegmentationStatItem, dictionary: Dictionary) {
        this.params.regionId = statItem.id;

        // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        //statItem.__proto__ = StatItemFamilyChildCount.prototype;

        let statDescription = new StatItemDescription();
        statDescription.id = dictionary.id;
        //statDescription.type = 'CHILD';
        //statDescription.statItem = statItem;
        //statDescription.table = 'Распределение семей по количеству детей';
        statDescription.field = this.translateService.currentLang === 'kz' ? dictionary.nameKz : dictionary.nameRu;

        this.eventShowListModal.emit(statDescription);
    }

    private fillFilterDescription() {
        this.filterDescription = '';
        //this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.district', this.filter.districtId, this.dictionaryDistrictOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasDisabled', this.filter.disabled, this.dictionaryDisabledOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasIncome', this.filter.income, this.dictionaryIncomeOptions);
        //this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.accommodation', this.filter.accommodation, this.dictionaryAccommodation);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.largeFamily', this.filter.largeFamily, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasTransport', this.filter.transport, this.dictionaryTransportOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasRealEstate', this.filter.realEstate, this.dictionaryRealEstateOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasDisabledChildren', this.filter.disabledChildren, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasVeterans', this.filter.veterans, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.attachedToClinic', this.filter.attachedToClinic, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.attachedToSchool', this.filter.attachedToSchool, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasLph', this.filter.lph, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasGrst', this.filter.grst, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasCommercialTransport', this.filter.commercialTransport, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasCommercialRealEstate', this.filter.commercialRealEstate, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.osmsParticipant', this.filter.osms, this.dictionaryYesNo);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.aspRecipient', this.filter.asp, this.dictionaryAspOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasEmployment', this.filter.employment, this.dictionaryEmploymentOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasCredits', this.filter.credits, this.dictionaryCreditOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasLand', this.filter.land, this.dictionaryLandOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasCriminalRecord', this.filter.criminalRecord, this.dictionaryCriminalRecordOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasDiseases', this.filter.disease, this.dictionaryDiseaseOptions);
        this.filterDescription += this.getFilterParamDescription('OPTION', 'sr.segmentationPage.hasEducation', this.filter.education, this.dictionaryEducationOptions);
    }

    private getFilterParamDescription(type: string, translateKey: string, param: any, dictionaryList: Array<any>) {
        let result: string = '';
        const colon = ': ', delimiter = ' / ';
        if (param) {

            const translateValue = this.utilService.getTranslationValue(translateKey);

            result = this.filterDescription ? delimiter : '';
            if (type === 'DICTIONARY') {
                result += '<span class="font-medium">' + translateValue + colon + '</span>' + this.dictionaryService.getDictionaryItem(dictionaryList, param).nameRu;
            } else if (type === 'OPTION') {
                result += '<span class="font-medium">' + translateValue + colon + '</span>' + this.dictionaryService.getDictionaryOption(dictionaryList, param).label;
            }
        }
        return result;
    }

}
