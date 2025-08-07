import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {StatItemASP} from "../models/stat/stat-item-asp";
import {StatItemPageRequest} from "../models/stat/stat-item-page-request";
import {StatItemPageResponseAsp} from "../models/stat/stat-item-page-response-asp";
import {StatItemASPPotential} from "../models/stat/stat-item-asp-potential";
import {NeedJournalRequest} from "../models/monitoring/need-journal-request";
import {NeedJournalResponse} from "../models/monitoring/need-journal-response";

@Injectable({
    providedIn: 'root'
})
export class MonitoringService {

    constructor(private httpService: HttpService) {
    }

    public getStatASP(params: any): Observable<Array<StatItemASP>> {
        return this.httpService.post('/monitoring/stat/aspApp', params);
    }

    public getStatPotentialASP(params: any): Observable<Array<StatItemASPPotential>> {
        return this.httpService.post('/monitoring/stat/aspAppV2', params);
    }

    public getStatListPage(params: StatItemPageRequest): Observable<StatItemPageResponseAsp> {
        return this.httpService.post('/monitoring/stat/aspApp/page', params);
    }

    public getNeedJournalList(params: NeedJournalRequest): Observable<NeedJournalResponse> {
        return this.httpService.post('/monitoring/need/journal', params);
    }

    public getIncorrectDataStat(): Observable<any> {
        return this.httpService.post('/monitoring/incorrectData/stat', {});
    }

    public getStatPage(filterRequest: { size: number; page: number; countId: number }): Observable<any> {
        return this.httpService.post('/monitoring/incorrectData/page', filterRequest);
    }
}
