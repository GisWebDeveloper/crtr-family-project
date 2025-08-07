import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {WelfareRequest} from "../models/welfare/welfare-request";
import {WelfareFamilyType} from "../models/welfare/welfare-family-type";

@Injectable({
    providedIn: 'root'
})
export class WelfareService {

    constructor(private httpService: HttpService) {
    }

    getWelfareByFamilyTypeStat(params: WelfareRequest): Observable<Array<WelfareFamilyType>> {
        return this.httpService.post('/welfare/family-type/history', params);
    }

}
