import {Injectable} from '@angular/core';
import {NotifierService} from "angular-notifier";
import * as Notiflix from 'notiflix';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import * as moment from 'moment';
import {Dictionary} from "../models/dictionary";
import {Region} from "../models/region";
import {AvailableIinsService} from "./available-iins.service";

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private notifierService: NotifierService,
                private router: Router,
                private translateService: TranslateService,
                private availableIinsService: AvailableIinsService) {
    }

    navigateToFamilyPortrait(iin: string | null | undefined) {
        if (iin) {
            this.availableIinsService.addIin(iin);
        }
    }

    public getErrorMessage(errorData: any): string {
        return errorData.error ? errorData.error.message : errorData.message;
    }

    public getTranslationValue(key: string, interpolateParams?: Object): string {
        return this.translateService.instant(key, interpolateParams);
    }

    public displayError(errorData: any) {
        this.notifyError(this.getErrorMessage(errorData));
    }

    private notifier(type: string, message: string) {
        this.notifierService.notify(type, message);
    }

    public notifierDefault(message: string) {
        this.notifier('default', message);
    }

    public notifierInfo(message: string) {
        this.notifier('info', message);
    }

    public notifierSuccess(message: string) {
        this.notifier('success', message);
    }

    public notifierWarning(message: string) {
        this.notifier('warning', message);
    }

    public notifierError(message: string) {
        this.notifier('error', message);
    }

    public notifyInfo(message: string) {
        Notiflix.Notify.info(message);
    }

    public notifySuccess(message: string) {
        Notiflix.Notify.success(message);
    }

    public notifyWarning(message: string) {
        Notiflix.Notify.warning(message);
    }

    public notifyError(message: string) {
        Notiflix.Notify.failure(message);
    }

    numberFormat(value: number | string | undefined) {
        if (value) {
            let number;
            if (typeof value === 'number') {
                number = value;
            } else {
                number = parseInt(value);
            }
            let fractionDigits = number.toString().split(".")[1] ? 2 : 0;
            let numberParts = number.toFixed(fractionDigits).split(".");
            numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return numberParts.join(".");
        } else {
            return 0;
        }
    }

    numberFormat2(value: number | string | undefined) {
        if (value) {
            let number;
            if (typeof value === 'number') {
                number = value;
            } else {
                number = parseInt(value);
            }
            let fractionDigits = number.toString().split(".")[1] ? 2 : 0;
            let numberParts = number.toFixed(fractionDigits).split(".");
            numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return numberParts.join(".");
        } else {
            return '';
        }
    }

    public get mapColors(): any {
        return {
            blue: '#3999ff',
            brown: '#663300',
            darkGrey: '#6c757d',
            green: '#85e085',
            grey: '#cccccc',
            lightBrown: '#996633',
            lightGreen: '#bfff00',
            lightGrey: '#f2f2f2',
            lightOrange: '#ffbc34',
            red: '#cd5c5c',
            orange: '#f9b115',
            purple: '#7460ee',
            purple2: '#993399',
            white: '#ffffff',
            yellow: '#ffff99',
        }
    };

    getTzhsLevelColor(tzhsId: number, isBg: boolean = false): string {
        let colorValue = '';
        const mapColors = this.mapColors;
        if ([1, 2, 3].includes(tzhsId)) {
            colorValue = isBg ? mapColors.lightGrey : mapColors.blue;
        } else if ([4, 5, 6].includes(tzhsId)) {
            colorValue = isBg ? mapColors.lightGrey : mapColors.green;
        } else if ([7, 8].includes(tzhsId)) {
            colorValue = isBg ? mapColors.grey : mapColors.yellow;
        } else if ([9, 10, 11].includes(tzhsId)) {
            colorValue = isBg ? mapColors.lightGrey : mapColors.orange;
        } else if ([12, 13, 14].includes(tzhsId)) {
            colorValue = isBg ? mapColors.lightGrey : mapColors.red;
        }
        return colorValue;
    }

    getTzhsSduLevelColor(tzhs: string, isBg: boolean = false): string {
        let colorValue = '';
        const mapColors = this.mapColors;
        if (tzhs === 'A') {
            colorValue = isBg ? mapColors.lightGrey : mapColors.blue;
        } else if (tzhs === 'B') {
            colorValue = isBg ? mapColors.lightGrey : mapColors.green;
        } else if (tzhs === 'C') {
            colorValue = isBg ? mapColors.grey : mapColors.yellow;
        } else if (tzhs === 'D') {
            colorValue = isBg ? mapColors.lightGrey : mapColors.orange;
        } else if (tzhs === 'E') {
            colorValue = isBg ? mapColors.lightGrey : mapColors.red;
        }
        return colorValue;
    }

    getCapitalized(value: string): string {
        let result = value;
        if (value) {
            let fieldValueArray = value.split(" ");
            result = fieldValueArray.map((element: string) => element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()).filter(Boolean).join(" ");
        }
        return result;
    }

    getCapitalizedList(list: Array<any>, fieldCode: string): Array<any> {
        list.forEach(item => {
            const fieldValue = item[fieldCode];
            item[fieldCode] = this.getCapitalized(fieldValue);
        });
        return list;
    }

    redirectTo(uri: string, params?: any) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                if (params) {
                    this.router.navigate([uri, params]);
                } else {
                    this.router.navigate([uri]);
                }
            }
        );
    }

    concat(separator: string, ...value: string[]): string {
        let valueArray = new Array<string>();
        for (let i = 0; i < value.length; i++) {
            let concatValue = value[i];
            if (concatValue != null) {
                concatValue = concatValue.toString()
                valueArray.push(concatValue.trim());
            }
        }
        return valueArray.filter(Boolean).join(separator);
    }

    formatDate(date: Date | undefined, fmt = 'DD.MM.YYYY'): string {
        if (date) {
            const now = moment(new Date(date));
            return now.format(fmt);
        }
        return '';
    }

    stringToDate(dateString: string, format?: string): Date | undefined {
        if (dateString) {
            format = format || 'DD.MM.YYYY';
            return moment(dateString, format).toDate();
        }
        return undefined;
    }

    getPeriodOfDates(dateFrom: string, dateTo: string): string {
        return [dateFrom, dateTo].filter(Boolean).join(' - ');
    }

    toggleCollapse(visibleList: boolean[], id: number): void {
        visibleList[id] = !visibleList[id];
    }

    getRegionName(stateName: string, regionName: string): string {
        return (stateName == regionName) ? stateName : this.concat(', ', stateName, regionName);
    }

    getRegionDescription(region: Dictionary | Region | undefined, regionState: Dictionary | Region | undefined): string {
        let stateName = '', regionName = '';
        if (region) regionName = this.getLocalization(region.nameKz, region.nameRu);
        if (regionState) stateName = this.getLocalization(regionState.nameKz, regionState.nameRu);
        return this.getRegionName(stateName, regionName);
    }

    stringToArray(value: string, separator?: string): Array<string> {
        const separatorValue = separator || ';';
        return value.split(separatorValue);
    }

    getArrayFieldSum(list: Array<any>, field: string): number {
        // @ts-ignore
        return list.map(item => item[field]).reduce((accumulator, current) => {
            return accumulator + (current | 0);
        }, 0);
    }

    getObjectFieldSum(object: any, fieldStartWith: string): number {
        return Object.keys(object).filter(key => key.toLowerCase().startsWith(fieldStartWith)).map(key => object[key]).reduce((accumulator, current) => {
            return accumulator + (current | 0);
        }, 0);
    }

    getObjectFieldValue(object: any, field: string) {
        return object[field];
    }

    sortArray(list: Array<any>, field?: string): Array<any> {
        if (field) {
            return list.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
        } else {
            return list.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        }
    }

    getObjectNumberValue(object: any, field: string) {
        return this.numberFormat(object[field]);
    }

    getRandomNumber(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }

    getLocalization(nameKz: string, nameRu: string): string {
        return this.translateService.currentLang == 'kz' ? nameKz : nameRu;
    }

    getListDescription(dictionary: Dictionary | Region, translateKey: string): string {
        let descArray = [];
        descArray.push(this.getLocalization(dictionary.nameKz, dictionary.nameRu));
        descArray.push(this.getTranslationValue(translateKey));
        return descArray.filter(Boolean).join(' / ');
    }

    getObjectProperties(object: any): string[] {
        return Object.keys(object);
    }
}
