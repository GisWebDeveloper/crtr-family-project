import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {BaseRequest} from "../models/base-request";
import {FamilyResponse} from "../models/family/family-response";
import {FamilyMember} from "../models/family/family-member";
import {UtilService} from "./util.service";

@Injectable({
    providedIn: 'root'
})
export class FamilyService {

    constructor(private httpService: HttpService,
                private utilService: UtilService) {
    }

    public openFamilyPortrait(iin: string) {
        this.utilService.navigateToFamilyPortrait(iin);
        this.utilService.redirectTo('/family/' + iin);
    }

    public getAvailableMeri(iin: string): Observable<FamilyResponse> {
        return this.httpService.get('/meri/available/' + iin, {});
    }

    public getFamilyInfo(params: BaseRequest): Observable<FamilyResponse> {
        return this.httpService.post('/card/familyInfo', params);
    }

    public getTzhsScore(iin: string): Observable<any> {
        return this.httpService.get('/card/tzhsScore/' + iin, {});
    }

    public getSortedMemberList(familyMemberList: Array<FamilyMember>): Array<FamilyMember> {
        let result = new Array<FamilyMember>();
        let bdOrder = familyMemberList.map(fm => {
            const bd = Number(this.utilService.formatDate(this.utilService.stringToDate(fm['birthDate']), 'YYYYMMDD'));
            return {iin: fm.iin, birthDate: bd};
        });
        bdOrder = bdOrder.sort((a, b) => a.birthDate - b.birthDate);
        bdOrder.forEach(bd => {
            const fm = familyMemberList.find(fm => fm.iin === bd.iin);
            if (fm) result.push(fm);
        });
        return this.utilService.getCapitalizedList(result, 'fullName');
    }
}
