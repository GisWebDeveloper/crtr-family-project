import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {CountStatItem} from "../models/count-stat-item";
import {CountRequest} from "../models/count/count-request";
import {CountResponse} from "../models/count/count-response";
import {CountNeedActionsStatItem} from "../models/count-need-actions-stat-item";

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

    constructor(private httpService: HttpService) {
    }

    public getStat(params: any): Observable<Array<CountStatItem>> {
        return this.httpService.post('/workspace/stat', params);
    }

    public getStatPage(params: any): Observable<any> {
        return this.httpService.post('/workspace/stat/page', params);
    }

    public getStatNeedActions(params: any): Observable<Array<CountNeedActionsStatItem>> {
        return this.httpService.post('/workspace/stat/need-actions', params);
    }

    public getStatNeedActionsPage(params: any): Observable<any> {
        return this.httpService.post('/workspace/stat/need-actions/page', params);
    }

    public getPersonCountActions(params: CountRequest): Observable<CountResponse> {
        return this.httpService.post('/workspace/count/action/list', params);
    }

    public savePersonCountActions(params: CountRequest): Observable<CountResponse> {
        return this.httpService.post('/workspace/count/action/save', params);
    }

}
