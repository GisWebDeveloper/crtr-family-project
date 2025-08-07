import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {UtilService} from "./util.service";
import {SegmentationResponse} from "../models/segmentation/segmentation-response";
import {RegionDictionariesResponse} from "../models/segmentation/region-dictionaries-response";
import {RegionDictionariesRequest} from "../models/segmentation/region-dictionaries-request";

@Injectable({
    providedIn: 'root'
})
export class SegmentationService {

    constructor(
        private httpService: HttpService,
        private utilService: UtilService) {
    }

    public getRegionDictionaries(param: RegionDictionariesRequest): Observable<RegionDictionariesResponse> {
        return this.httpService.post('/segmentation/regionDictionaries', param);
    }

    public getSegmentationStat(params: any): Observable<SegmentationResponse> {
        return this.httpService.post('/segmentation/stat', params);
    }

    public getSegmentationStatNew(params: any): Observable<SegmentationResponse> {
        return this.httpService.post('/segmentation/statNew', params);
    }

    public getSegmentationPageNew(params: any): Observable<SegmentationResponse> {
        return this.httpService.post('/segmentation/pageNew', params);
    }

    public getSegmentationStatAll(params: any): Observable<SegmentationResponse> {
        return this.httpService.post('/segmentation/all', params);
    }
}
