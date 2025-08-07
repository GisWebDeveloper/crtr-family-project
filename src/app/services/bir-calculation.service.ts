import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {TranslateService} from "@ngx-translate/core";
import {BaseRequest} from "../models/base-request";
import {Observable} from "rxjs";
import {PersonResponse} from "../models/person/person-response";
import {BirCalculationResponse} from "../models/bir-calculation/bir-calculation-response";

@Injectable({
  providedIn: 'root'
})
export class BirCalculationService {

    constructor(private httpService: HttpService) {
    }

    public getCalculation(params: any): Observable<BirCalculationResponse> {
        return this.httpService.post('/birCalculation', params);
    }
}
