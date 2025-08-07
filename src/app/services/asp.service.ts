import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {AspReport} from "../models/asp/asp-report";
import {StatItemPopulation} from "../models/stat/stat-item-population";

@Injectable({
    providedIn: 'root'
})
export class AspService {

    constructor(private httpService: HttpService) {
    }

    public getAspInfo(): Observable<Array<AspReport>> {
        return this.httpService.get('/asp/report', {});
    }

}
