import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FarmAnimal} from "../../../../models/common/farm-animal";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-person-farm-animal',
    templateUrl: './person-farm-animal.component.html',
    styleUrls: ['./person-farm-animal.component.scss']
})
export class PersonFarmAnimalComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showFarmAnimal: EventEmitter<Array<FarmAnimal>>;

    farmAnimalList: Array<FarmAnimal>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.farmAnimalList = new Array<FarmAnimal>();
        this.showFarmAnimal.asObservable().subscribe(faList => {
            this.farmAnimalList = faList;
        });
    }

}
