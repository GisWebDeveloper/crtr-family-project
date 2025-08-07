import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {SegmentationStatItem} from "../../../models/segmentation/segmentation-stat-item";
import {DictionaryService} from "../../../services/dictionary.service";
import {SegmentationService} from "../../../services/segmentation.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {SegmentationResponse} from "../../../models/segmentation/segmentation-response";
import {RegionDictionariesRequest} from "../../../models/segmentation/region-dictionaries-request";
import {SegmentationNewFilter} from "../../../models/segmentation/segmentation-new-filter";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-segmentation-new-fc',
    templateUrl: './segmentation-new-fc.component.html',
    styleUrls: ['./segmentation-new-fc.component.scss']
})
export class SegmentationNewFcComponent implements OnInit {

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<SegmentationNewFilter>();

    // 0. FILTER
    visible = [true];
    filterGroup = 0;
    selectedFamilyTzhsGroup: any | null = null;
    selectedTable = 1;
    permissions = Permissions.PERMISSIONS;

    dictionaryFamilyTzhs: Dictionary[] = [];
    dictionaryDistrict: any[] = [];
    dictionaryRegion: any[] = [];
    dictionaryYesNo: any[] = [];
    dictionaryReverseYesNo: any[] = [];
    dictionaryFamSdd: any[] = [];
    dictionaryFamCreditZ: any[] = [];
    dictionaryFamDvTran: any[] = [];
    dictionaryFamEmp: any[] = [];
    dictionaryFamUl: any[] = [];
    dictionaryFamEduS: any[] = [];
    dictionaryFamEduSh: any[] = [];
    dictionaryFamDvGrst: any[] = [];
    dictionaryFamNedvLand: any[] = [];
    dictionaryFamLph: any[] = [];
    dictionaryFamNedv: any[] = [];
    dictionaryFamAdr: any[] = [];
    dictionaryFamChild: any[] = [];
    dictionaryFamAsp: any[] = [];
    dictionaryFamilyType: any[] = [];

    filterGroupList = [
        'segmentation-new-page.filter-group.income-loans.name',
        'segmentation-new-page.filter-group.property.name',
        'segmentation-new-page.filter-group.employment-labor.name',
        'segmentation-new-page.filter-group.healthcare.name',
        'segmentation-new-page.filter-group.education.name',
        'segmentation-new-page.filter-group.agricultural-industry.name',
        'segmentation-new-page.filter-group.infrastructure.name',
        'segmentation-new-page.filter-group.special-services.name',
        'segmentation-new-page.filter-group.asp.name'
    ];

    dictionaryFamilyTzhsGroup = ['A', 'B', 'C', 'D', 'E'];

    selectFilters = {
        famSdd: 'dictionaryFamSdd',
        famCreditZ: 'dictionaryFamCreditZ',
        famDvTran: 'dictionaryFamDvTran',
        famEmp: 'dictionaryFamEmp',
        famUl: 'dictionaryFamUl',
        famEduS: 'dictionaryFamEduS',
        famEduSh: 'dictionaryFamEduSh',
        famDvGrst: 'dictionaryFamDvGrst',
        famNedvLand: 'dictionaryFamNedvLand',
        famLph: 'dictionaryFamLph',
        famNedv: 'dictionaryFamNedv',
        famAdr: 'dictionaryFamAdr',
        famChild: 'dictionaryFamChild',
        famAsp: 'dictionaryFamAsp'
    }

    radioFiltersDictionary = {
        famCredit: 'dictionaryReverseYesNo',
        famDvTranCom: 'dictionaryReverseYesNo',
        famNedvCom: 'dictionaryReverseYesNo',
        famMed: 'dictionaryYesNo',
        famOsms: 'dictionaryYesNo',
        famDiseaseB: 'dictionaryReverseYesNo',
        famDiseaseD: 'dictionaryReverseYesNo',
        famInv1: 'dictionaryReverseYesNo',
        famInv3: 'dictionaryReverseYesNo',
        famInvChild: 'dictionaryReverseYesNo'
    }

    radioFiltersLabel = {
        famCredit: 'segmentation-new-page.filter-group.income-loans.fam-credit',
        famDvTranCom: 'segmentation-new-page.filter-group.property.fam-dv-tran-com',
        famNedvCom: 'segmentation-new-page.filter-group.property.fam-nedv-com',
        famMed: 'segmentation-new-page.filter-group.healthcare.fam-med',
        famOsms: 'segmentation-new-page.filter-group.healthcare.fam-osms',
        famDiseaseB: 'segmentation-new-page.filter-group.healthcare.fam-disease-b',
        famDiseaseD: 'segmentation-new-page.filter-group.healthcare.fam-disease-d',
        famInv1: 'segmentation-new-page.filter-group.special-services.fam-inv-1',
        famInv3: 'segmentation-new-page.filter-group.special-services.fam-inv-3',
        famInvChild: 'segmentation-new-page.filter-group.special-services.fam-inv-child'
    }

    filter: SegmentationNewFilter = new SegmentationNewFilter();

    params: {
        regionId: number | undefined,
        stat: Array<SegmentationStatItem>,
        statTotal: SegmentationStatItem,
        selectedFamilyTzhsGroupTotal: SegmentationStatItem
    }

    chartParams: {
        ids: number[],
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
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.params = {
            regionId: undefined,
            stat: new Array<SegmentationStatItem>(),
            statTotal: new SegmentationStatItem(),
            selectedFamilyTzhsGroupTotal: new SegmentationStatItem()
        };
        this.chartParams = {ids: [], labels: [], data: [], filteredData: [], total: 0, filteredTotal: 0};

        this.dictionaryService.getFamilyTzhsDictionary2().subscribe({
            next: response => {
                this.dictionaryFamilyTzhs = response || [];

                if (this.dictionaryFamilyTzhs) {
                    this.dictionaryFamilyTzhs.forEach(item => {
                        let label = item.nameRu, value = 0, id = item.id;
                        this.chartParams.ids.push(id);
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
        this.dictionaryYesNo = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getYesNoDictionary(), true);
        this.dictionaryReverseYesNo = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getReverseYesNoDictionary(), true);
        this.dictionaryFamilyType = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryFamilyType(), true);

        this.dictionaryService.getFamDictionaries().subscribe({
            next: response => {
                this.dictionaryFamSdd = this.dictionaryService.dictionaryToSelectOptions(response.famSddDictionary, true);
                this.dictionaryFamCreditZ = this.dictionaryService.dictionaryToSelectOptions(response.famCreditZDictionary, true);
                this.dictionaryFamDvTran = this.dictionaryService.dictionaryToSelectOptions(response.famDvTranDictionary, true);
                this.dictionaryFamEmp = this.dictionaryService.dictionaryToSelectOptions(response.famEmpDictionary, true);
                this.dictionaryFamUl = this.dictionaryService.dictionaryToSelectOptions(response.famUlDictionary, true);
                this.dictionaryFamEduS = this.dictionaryService.dictionaryToSelectOptions(response.famEduSDictionary, true);
                this.dictionaryFamEduSh = this.dictionaryService.dictionaryToSelectOptions(response.famEduShDictionary, true);
                this.dictionaryFamDvGrst = this.dictionaryService.dictionaryToSelectOptions(response.famDvGrstDictionary, true);
                this.dictionaryFamNedvLand = this.dictionaryService.dictionaryToSelectOptions(response.famNedvLandDictionary, true);
                this.dictionaryFamLph = this.dictionaryService.dictionaryToSelectOptions(response.famLphDictionary, true);
                this.dictionaryFamNedv = this.dictionaryService.dictionaryToSelectOptions(response.famNedvDictionary, true);
                this.dictionaryFamAdr = this.dictionaryService.dictionaryToSelectOptions(response.famAdrDictionary, true);
                this.dictionaryFamChild = this.dictionaryService.dictionaryToSelectOptions(response.famChildDictionary, true);
                this.dictionaryFamAsp = this.dictionaryService.dictionaryToSelectOptions(response.famAspDictionary, true);
            }, error: error => {
                this.utilService.displayError(error);
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
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        })
    }

    search() {
        let filterRequest: any = this.filter;
        this.segmentationService.getSegmentationStatNew(filterRequest).subscribe({
            next: segmentResponse => {
                this.selectedTable = this.filter.familyTzhsGroup ? 2 : 1;
                this.selectedFamilyTzhsGroup = this.filter.familyTzhsGroup;
                this.processSearchResponse(segmentResponse);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    private processSearchResponse(response: SegmentationResponse) {
        let filterStatList = response.filterStatList;

        this.params.stat = filterStatList.filter(item => item.id != 0);
        this.params.statTotal = filterStatList.filter(item => item.id == 0)[0];

        if (!this.filter.familyTzhsGroup) {
            this.params.statTotal.total = this.utilService.getObjectFieldSum(this.params.statTotal, 'cnt');
            this.params.stat.forEach(stat => {
                stat.total = this.utilService.getObjectFieldSum(stat, 'cnt');
            });
        } else {
            let ids = this.getFamilyTzhsGroupIds();
            this.params.statTotal.total = 0;
            ids.forEach(id => {
                this.params.statTotal.total += +this.params.statTotal[('cnt' + id) as keyof SegmentationStatItem];
            });
            this.params.stat.forEach(stat => {
                stat.total = 0;
                ids.forEach(id => {
                    stat.total += +stat[('cnt' + id) as keyof SegmentationStatItem];
                });
            });
        }
    }


    showFilterGroup(index: number) {
        this.filterGroup = index;
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

    getFilterKeys(): string[] {
        return Object.keys(this.filter);
    }

    getFilterLabel(key: string): string {
        if (key === "districtId") {
            const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
            return this.dictionaryDistrict.find(temp => temp.id === this.filter[key])[nameField];
        }
        if (key === "regionId") {
            const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
            return this.dictionaryRegion.find(temp => temp.id === this.filter[key])[nameField];
        }
        if (this.radioFiltersDictionary.hasOwnProperty(key)) {
            let label = this.utilService.getTranslationValue(this.utilService.getObjectFieldValue(this.radioFiltersLabel, key));
            let dictionary: any[] = this.utilService.getObjectFieldValue(this, this.utilService.getObjectFieldValue(this.radioFiltersDictionary, key));
            return label + ' - ' + dictionary.find(temp => temp.value === this.utilService.getObjectFieldValue(this.filter, key))?.label;
        }
        if (key === 'familyTzhsGroup') {
            return this.utilService.getTranslationValue('segmentation-new-page.well-being-level')
                + ' - ' + this.filter[key];
        }
        if (key === "famType") {
            return this.dictionaryFamilyType.find(temp => temp.value === this.filter[key]).label;
        }
        return '';
    }

    getFilterValues(key: string): number[] {
        return this.utilService.getObjectFieldValue(this.filter, key);
    }

    getSelectFilterLabel(value: number, key: string): string {
        let dictionary: any[] = this.utilService.getObjectFieldValue(this, this.utilService.getObjectFieldValue(this.selectFilters, key));
        return dictionary.find(temp => temp.value === value)?.label;
    }

    showKey(key: string): boolean {
        return key !== 'version' && this.filter[key as keyof SegmentationNewFilter] !== null;
    }

    resetFilters() {
        for (let key of Object.getOwnPropertyNames(this.filter)) {
            if (key === 'districtId') {
                if (this.dictionaryDistrict.length === 1 && this.dictionaryRegion.length !== 1) {
                    this.filter['regionId'] = null;
                } else if (this.dictionaryDistrict.length !== 1) {
                    this.filter[key] = null;
                    this.filter['regionId'] = null;
                }
            } else if (key !== 'districtId' && key !== 'regionId' && key !== 'version') {
                this.filter[key as keyof SegmentationNewFilter] = null;
            }
        }
    }

    resetFilter(key: string) {
        if (key === 'districtId' && this.dictionaryDistrict.length !== 1) {
            this.filter.districtId = null;
            this.filter.regionId = null
        } else if (key === 'regionId' && this.dictionaryRegion.length !== 1) {
            this.filter.regionId = null;
        } else if (key !== 'districtId' && key !== 'regionId') {
            this.filter[key as keyof SegmentationNewFilter] = null;
        }
    }

    resetSelectFilter(value: number, key: string) {
        let filter: any[] = this.getFilterValues(key);
        this.filter[key as keyof SegmentationNewFilter] = filter.filter(temp => temp != value);
    }

    getFamilyTzhsGroupIds(): number[] {

        return this.dictionaryFamilyTzhsGroup
            .map((temp, index) => temp === this.selectedFamilyTzhsGroup ? index + 1 : -1)
            .filter(index => index !== -1);
        // if (this.selectedFamilyTzhsGroup === 'A') {
        //     return [1, 2, 3];
        // }
        // if (this.selectedFamilyTzhsGroup === 'B') {
        //     return [4, 5, 6];
        // }
        // if (this.selectedFamilyTzhsGroup === 'C') {
        //     return [7, 8];
        // }
        // if (this.selectedFamilyTzhsGroup === 'D') {
        //     return [9, 10, 11];
        // }
        // return [12, 13, 14];
    }

    getFamilyTzhsGroupClass(): string {
        if (this.selectedFamilyTzhsGroup === 'A') {
            return 'bg-info';
        }
        if (this.selectedFamilyTzhsGroup === 'B') {
            return 'bg-green';
        }
        if (this.selectedFamilyTzhsGroup === 'C') {
            return 'bg-yellow';
        }
        if (this.selectedFamilyTzhsGroup === 'D') {
            return 'bg-warning';
        }
        return 'bg-red';
    }

    showListModal(famTzhs: string, region: SegmentationStatItem) {
        let listFilter: any = new SegmentationNewFilter();
        for (let key of this.getFilterKeys()) {
            listFilter[key] = this.filter[key as keyof SegmentationNewFilter];
        }
        listFilter.famTzhs = famTzhs;
        listFilter.regionId = region.id;
        listFilter.title = 'Сегментация / ' + region.nameRu + ' / ' + famTzhs;
        this.eventShowListModal.emit(listFilter);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
