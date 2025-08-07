import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Dictionary} from "../models/dictionary";
import {StatusStatRequest} from "../models/status/status-stat-request";
import {StatusStat} from "../models/status/status-stat";
import {StatusPageRequest} from "../models/status/status-page-request";
import {StatusPageResponse} from "../models/status/status-page-response";

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private httpService: HttpService) {
    }

    public getStatusDictionaryList(): Observable<Array<Dictionary>> {
        return this.httpService.post('/status/list', {});
    }

    public getCategoryDictionaryList(): Observable<Array<Dictionary>> {
        return this.httpService.post('/category/list', {});
    }

    public getStatusStat(params: StatusStatRequest): Observable<Array<StatusStat>> {
        return this.httpService.post('/status/count', params);
    }

    public getStatusStatPage(params: StatusPageRequest): Observable<StatusPageResponse> {
        return this.httpService.post('/status/count/page', params);
    }
}
