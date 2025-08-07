import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private static readonly CLIENT_LANGUAGE: string = 'clientLang';
    private static readonly PERSON_IIN: string = 'personIIN';
    private static readonly PERSON_FULL_NAME: string = 'personFullName';
    private static readonly PERSON_SEARCH_MODE: string = 'personSearchMode';
    private static readonly USER_AUTH: string = 'userAuth';
    private static readonly AVAILABLE_IINS: string = 'availableIins';

    // Коды категорий отчета по трудоспособным
    public static readonly REPORT_CATEGORY_CODE_521: string = 'RC521';
    public static readonly REPORT_CATEGORY_CODE_522: string = 'RC522';

    public static readonly EVENT_DELAY = 100;
    public static readonly EVENT_DELAY_SHORT = 20;
    public static readonly EVENT_DELAY_500 = 500;

    constructor() {
    }

    private setItemValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    private getItemValue(key: string): string | null {
        return localStorage.getItem(key);
    }

    setPersonIIN(value: string) {
        this.setItemValue(DataService.PERSON_IIN, value);
    }

    getPersonIIN(): string | null {
        return this.getItemValue(DataService.PERSON_IIN);
    }

    setPersonFullName(value: string) {
        this.setItemValue(DataService.PERSON_FULL_NAME, value);
    }

    getPersonFullName(): string | null {
        return this.getItemValue(DataService.PERSON_FULL_NAME);
    }

    setPersonSearchMode(value: string) {
        this.setItemValue(DataService.PERSON_SEARCH_MODE, value);
    }

    getPersonSearchMode(): string | null {
        return this.getItemValue(DataService.PERSON_SEARCH_MODE);
    }

    setClientLanguage(value: string) {
        this.setItemValue(DataService.CLIENT_LANGUAGE, value);
    }

    getClientLanguage(): string {
        return this.getItemValue(DataService.CLIENT_LANGUAGE) || 'ru';
    }

    setUserAuth(value: string) {
        this.setItemValue(DataService.USER_AUTH, value);
    }

    getUserAuth(): string | null {
        return this.getItemValue(DataService.USER_AUTH);
    }

    getAvailableIins(): string[] {
        return JSON.parse(localStorage.getItem(DataService.AVAILABLE_IINS) || '') || [];
    }

    addAvailableIins(iin: string) {
        const iins: string[] = JSON.parse(localStorage.getItem(DataService.AVAILABLE_IINS) || '[]') || [];
        iins.push(iin);
        localStorage.setItem(DataService.AVAILABLE_IINS, JSON.stringify([...new Set(iins)]));
    }
}
