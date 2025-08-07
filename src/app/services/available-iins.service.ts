import {Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class AvailableIinsService {

    constructor(private dataService: DataService) {
    }

    public addIin(iin: string) {
        this.dataService.addAvailableIins(iin);
    }

    hasIin(iin: string): boolean {
        return this.dataService.getAvailableIins().includes(iin);
    }

}
