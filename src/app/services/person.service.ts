import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {BaseRequest} from "../models/base-request";
import {PersonResponse} from "../models/person/person-response";
import {Person} from "../models/person/person";
import {TranslateService} from "@ngx-translate/core";
import {ZagsResponse} from "../models/zags/zags-response";
import {GovernmentMeasure} from "../models/common/gov-measure";
import {PersonForm} from "../models/person/person-form";
import {FamilyMember} from "../models/family/family-member";
import {Timeline} from "../models/common/timeline";
import {PersonSearchRequest} from "../models/person/person-search-request";
import {PersonSearchResponse} from "../models/person/person-search-response";

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private httpService: HttpService,
                private translateService: TranslateService) {
    }

    public getPersonInfo(params: BaseRequest): Observable<PersonResponse> {
        return this.httpService.post('/card/getPersonDetailsDTOByIin', params);
    }

    public getPersonGovMeasures(params: BaseRequest): Observable<Array<GovernmentMeasure>> {
        return this.httpService.post('/card/getPersonGovMeasures', params);
    }

    public getPersonZagsInfo(params: BaseRequest): Observable<ZagsResponse> {
        return this.httpService.post('/zags/info', params);
    }

    public getPersonPhoneNumber(params: BaseRequest): Observable<string> {
        return this.httpService.post('/card/findPhoneByIin', params);
    }

    public savePersonForm(params: PersonForm): Observable<any> {
        return this.httpService.post('/form/family/member/save', params);
    }

    public getRegAddressMembers(param: any): Observable<any> {
        return this.httpService.post('/card/regAddressMembers', param);
    }

    public getRegAddressHistory(param: any): Observable<any> {
        return this.httpService.post('/card/regAddressHistory', param);
    }

    public getPersonTimeline(iin: string): Observable<Array<Timeline>> {
        return this.httpService.post('/person/timeline', iin);
    }

    public searchPerson(params: PersonSearchRequest): Observable<PersonSearchResponse> {
        return this.httpService.post('/search/person', params);
    }

    public getPersonBirthAddress(person: Person) {
        let name = this.translateService.currentLang === 'kz' ? 'nameKz' : 'nameRu';
        // @ts-ignore
        let district = person.birthDistricts ? person.birthDistricts[name] : null;
        // @ts-ignore
        let region = person.birthRegion ? person.birthRegion[name] : null;
        return [district, region, person.birthCity].filter(Boolean).join(', ');
    }

    public getPersonRegAddress(person: Person) {
        const name = this.translateService.currentLang === 'kz' ? 'nameKz' : 'nameRu';
        const district = person.regAddressDistricts ? person.regAddressDistricts[name] : null;
        const region = person.regAddressRegion ? person.regAddressRegion[name] : null;
        const streetRu = person.regAddressStreet ? 'Улица ' + person.regAddressStreet.replace(/Улица/ig, '').trim() : '';
        const streetKz = person.regAddressStreet ? person.regAddressStreet.replace(/көшесі/ig, '').trim() + ' көшесі' : ''
        const street = this.translateService.currentLang === 'kz' ? streetKz : streetRu;
        return [district, region, person.regAddressCity, street, person.regAddressBuilding, person.regAddressCorpus, person.regAddressFlat].filter(Boolean).join(', ');
    }
}
