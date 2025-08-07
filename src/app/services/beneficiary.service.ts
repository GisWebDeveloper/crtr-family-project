import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {BeneficiaryStat} from "../models/beneficiary/beneficiary-stat";

@Injectable({
    providedIn: 'root'
})
export class BeneficiaryService {

    constructor(private httpService: HttpService) {
    }

    public getStat(): Observable<BeneficiaryStat[]> {
        return this.httpService.get('/beneficiary/stat', {});
    }

    public getPage(filterRequest: { code: string | undefined; size: number; page: number }) {
        return this.httpService.post('/beneficiary/page', filterRequest);
    }
}
