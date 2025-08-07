import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {CountStatItem} from "../models/count-stat-item";

@Injectable({
    providedIn: 'root'
})
export class NeedActionsService {

    constructor(private httpService: HttpService) {
    }

    public getStat(params: any): Observable<Array<CountStatItem>> {
        return this.httpService.post('/workspace/stat', params);
    }
}
