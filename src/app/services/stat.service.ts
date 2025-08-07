import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {StatItemTzhsStatus} from "../models/stat/stat-item-tzhs-status";
import {StatItemPageResponse} from "../models/stat/stat-item-page-response";
import {StatItemPageRequest} from "../models/stat/stat-item-page-request";
import {StatItemPopulation} from "../models/stat/stat-item-population";
import {StatItemFamilyType} from "../models/stat/stat-item-family-type";
import {StatItemFamilyMemberCount} from "../models/stat/stat-item-family-member-count";
import {StatItemFamilyChildCount} from "../models/stat/stat-item-family-child-count";
import {StatItemFamilyIncomePM} from "../models/stat/stat-item-family-income-pm";
import {StatItemSUSN} from "../models/stat/stat-item-susn";
import {StatItemChildPath} from "../models/stat/stat-item-child-path";
import {StatItem} from "../models/stat/stat-item";
import {UtilService} from "./util.service";
import {StatItemFamilyTypeV2} from "../models/stat/stat-item-family-type-v2";
import {StatItemBase} from "../models/stat/stat-item-base";
import {StatItemTzhs} from "../models/stat/stat-item-tzhs";
import {StatItemTzhsExtended} from "../models/stat/stat-item-tzhs-extended";
import {StatItemTzhsExtendedStatus} from "../models/stat/stat-item-tzhs-extended-status";
import {StatItemTzhsSduStatus} from "../models/stat/stat-item-tzhs-sdu-status";
import {StatItemTzhsTwo} from "../models/stat/stat-item-tzhs-two";

@Injectable({
    providedIn: 'root'
})
export class StatService {

    constructor(
        private httpService: HttpService,
        private utilService: UtilService) {
    }

    public getTzhsStat(): Observable<Array<StatItemTzhs>> {
        return this.httpService.post('/stat/tzhs', {});
    }

    public getTzhsExtendedStat(): Observable<Array<StatItemTzhsExtended>> {
        return this.httpService.post('/stat/tzhsExtended', {});
    }

    public getTzhsSduStat(): Observable<{ list: Array<StatItemTzhsSduStatus>, buildDate: string}> {
        return this.httpService.post('/stat/tzhsSdu', {});
    }

    public getTzhsStatTwo(): Observable<Array<StatItemTzhsTwo>> {
        return this.httpService.post('/stat/tzhsTwo', {});
    }

    public getTzhsPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhs/page', params);
    }

    public getTzhsExtendedPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhsExtended/page', params);
    }

    public getTzhsSduPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhsSdu/page', params);
    }

    public getTzhsTwoPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhsTwo/page', params);
    }

    public getTzhsStatusStat(statusCode: string): Observable<Array<StatItemTzhsStatus>> {
        return this.httpService.post('/stat/tzhs/status', statusCode);
    }

    public getTzhsExtendedStatusStat(statusCode: string): Observable<Array<StatItemTzhsExtendedStatus>> {
        return this.httpService.post('/stat/tzhsExtended/status', statusCode);
    }

    public getTzhsSduStatusStat(statusCode: string): Observable<{ list: Array<StatItemTzhsSduStatus>, buildDate: string}> {
        return this.httpService.post('/stat/tzhsSdu/status', statusCode);
    }

    public getTzhsStatusPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhs/status/page', params);
    }

    public getTzhsExtendedStatusPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhsExtended/status/page', params);
    }

    public getTzhsSduStatusPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/tzhsSdu/status/page', params);
    }

    public getStatPersonList(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/familyStat/page', params);
    }

    public getStatPopulation(): Observable<Array<StatItemPopulation>> {
        return this.httpService.post('/stat/population', {});
    }

    public getStatFamilyType(): Observable<Array<StatItemFamilyType>> {
        return this.httpService.post('/familyStat/type', {});
    }

    public getStatFamilyTypeV2(): Observable<Array<StatItemFamilyTypeV2>> {
        return this.httpService.post('/stat/family/type', {});
    }

    public getFamilyTypePersonListV2(params: StatItemPageRequest): Observable<StatItemPageResponse> {
        return this.httpService.post('/stat/family/type/page', params);
    }

    public getStatFamilyMemberCount(): Observable<Array<StatItemFamilyMemberCount>> {
        return this.httpService.post('/familyStat/member', {});
    }

    public getStatFamilyChildCount(): Observable<Array<StatItemFamilyChildCount>> {
        return this.httpService.post('/familyStat/child', {});
    }

    public getStatFamilyIncomePM(): Observable<Array<StatItemFamilyIncomePM>> {
        return this.httpService.post('/familyStat/pm', {});
    }

    public getStatSUSN(): Observable<Array<StatItemSUSN>> {
        return this.httpService.post('/familyStat/susn', {});
    }

    public getStatChildPath(): Observable<Array<StatItemChildPath>> {
        return this.httpService.post('/stat/child/path', {});
    }

    public getStatValue(statItem: StatItem | StatItemBase, field: string): number {
        // @ts-ignore
        return this.utilService.numberFormat(statItem[field]);
    }

    public isSelectedRegionStat(statItemList: Array<StatItem>, statItem: StatItem | undefined, regionId: number): boolean {
        return !!statItem && (statItem.regionId === regionId || statItemList.filter(stat => stat.regionParentId == regionId).length > 0);
    }

    public calculateTotalStat(statItemList: Array<StatItem>, totalStatItem: StatItem) {
        totalStatItem.isTotal = true;
        Object.keys(totalStatItem).filter(key => (key.toLowerCase().startsWith('cnt') || key.toLowerCase().includes('total')
            || key.toLowerCase().startsWith('per')) && key.toLowerCase() != 'istotal').forEach(key => {
            // @ts-ignore
            totalStatItem[key] = this.utilService.getArrayFieldSum(statItemList, key);
        });
    }
}
