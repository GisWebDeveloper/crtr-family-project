import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {CountPageRequest} from "../models/count/count-page-request";
import {Observable} from "rxjs";
import {ReportEmployables} from "../models/report/report-employables";
import {AkimStatHistory} from "../models/akim/akim-stat-history";

@Injectable({
    providedIn: 'root'
})
export class AkimService {

    constructor(private httpService: HttpService) {
    }

    getAkimMember(params: any) {
        return this.httpService.post('/akim/member', params)
    }

    getAkimStat(regionId?: number) {
        return regionId ?
            this.httpService.get('/akim/stat/' + regionId, {}) :
        this.httpService.get('/akim/stat', {});
    }

    getAkimStat2(regionId?: number) {
        return regionId ?
            this.httpService.get('/akim/stat2/' + regionId, {}) :
            this.httpService.get('/akim/stat2', {});

    }

    getAkimStatHistory(param: any): Observable<AkimStatHistory[]> {
        return this.httpService.post('/akim/statHistory', param);
    }

    getAkimStatHistory2(param: any): Observable<any[]> {
        return this.httpService.post('/akim/statHistory2', param);
    }

}
