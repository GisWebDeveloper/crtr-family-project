import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Dictionary} from "../models/dictionary";

@Injectable({
    providedIn: 'root'
})
export class NecessityService {

    constructor(private httpService: HttpService) {
    }

    public getStat(params: any): Observable<any> {
        return this.httpService.post('/necessity/stat', params);
    }

    public getMember(params: any): Observable<any> {
        return this.httpService.post('/necessity/member', params);
    }
}
