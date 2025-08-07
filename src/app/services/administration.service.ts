import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {AppItemsRequest} from "../models/administration/app-items-request";
import {ActionLogRequest} from "../models/administration/action-log-request";
import {ActionLogResponse} from "../models/administration/action-log-response";
import {DatabaseUpdateProcedureInfo} from "../models/administration/database-update-procedure-info";
import {UpdateDatabaseProcedureLog} from "../models/administration/update-database-procedure-log";
import {DatabaseUpdateProcedureLogsPage} from "../models/administration/database-update-procedure-logs-page";

@Injectable({
    providedIn: 'root'
})
export class AdministrationService {

    constructor(private httpService: HttpService) {
    }

    public getAppItemList(): Observable<AppItemsRequest> {
        return this.httpService.post('/admin/appItem/list', {});
    }

    public crudAppItem(params: AppItemsRequest): Observable<AppItemsRequest> {
        return this.httpService.post('/admin/appItem/crud', params);
    }

    public assignAppItem(params: AppItemsRequest): Observable<AppItemsRequest> {
        return this.httpService.post('/admin/appItem/assign', params);
    }

    public getActionLog(params: ActionLogRequest): Observable<ActionLogResponse> {
        return this.httpService.post('/admin/actionLog/list', params);
    }

    public getUpdateProcedureList(): Observable<DatabaseUpdateProcedureInfo[]> {
        return this.httpService.get('/admin/databaseUpdateProcedures', {});
    }

    public getUpdateProcedureLogs(param: DatabaseUpdateProcedureLogsPage): Observable<DatabaseUpdateProcedureLogsPage> {
        return this.httpService.post('/admin/databaseUpdateProcedures/logs', param);
    }

    public runUpdateProcedure(id: number): Observable<string> {
        return this.httpService.get('/admin/databaseUpdateProcedures/run/' + id, {});
    }

}
