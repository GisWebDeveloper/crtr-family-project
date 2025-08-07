import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Dictionary} from "../models/dictionary";
import {TzhsDictionary} from "../models/tzhs-dictionary";

@Injectable({
  providedIn: 'root'
})
export class TzhsService {

    constructor(private httpService: HttpService) {
    }

    public getTzhsMemberPage(param: any): Observable<any> {
        return this.httpService.post('/tzhs/member', param);
    }
}
