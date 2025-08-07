import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {KandasMonitorAction} from "../models/kandas/kandas-monitor-action";
import {KandasPersonForm} from "../models/kandas/kandas-person-form";
import {MonitoringSusn} from "../models/kandas/monitoring-susn";
import {KandasStatPageRequest} from "../models/kandas/kandas-stat-page-request";
import {KandasStatPageResponse} from "../models/kandas/kandas-stat-page-response";

@Injectable({
    providedIn: 'root'
})
export class KandasService {

    constructor(private httpService: HttpService) {
    }

    getKandasForm(countId: number, iin: string): Observable<{ fullName: string, list: KandasMonitorAction[] }> {
        return this.httpService.post("/kandas/form", {countId: countId, iin: iin});
    }

    getKandasFormNew(countId: number, iin: string): Observable<{ fullName: string, list: {id: number, nameRu: string, answerId: number}[] }> {
        return this.httpService.post("/kandas/formNew", {countId: countId, iin: iin});
    }

    getKandasStat(countId: number, regionId: number): Observable<{ id: number, nameRu: string, cnt1: number, cnt2: number, cnt3: number, cnt4: number }[]> {
        return this.httpService.post("/kandas/stat", {countId: countId, regionId: regionId});
    }

    getKandasStatNew(countId: number, regionId: number): Observable<{ id: number, nameRu: string, cnt1: number, cnt2: number, cnt3: number, cnt4: number, cnt5: number }[]> {
        return this.httpService.post("/kandas/statNew", {countId: countId, regionId: regionId});
    }

    getKandasList(param: KandasStatPageRequest): Observable<KandasStatPageResponse> {
        return this.httpService.post("/kandas/list", param);
    }

    getKandasPersonForm(iin: string, countId: number): Observable<KandasPersonForm> {
        return this.httpService.post("/individualPlan/kandas", {iin: iin, countId: countId});
    }

    getSusnForm(iin: string): Observable<MonitoringSusn> {
        return this.httpService.get("/individualPlan/susn/" + iin, {});
    }

    getHeadIin(iin: string): Observable<string> {
        return this.httpService.post("/kandas/headIin", iin);
    }

    getAvailableForms(iin: string): Observable<{ isKandas: boolean, isPereselensy: boolean, isSusn: boolean }> {
        return this.httpService.post("/kandas/getAvailableForms", iin);
    }

}
