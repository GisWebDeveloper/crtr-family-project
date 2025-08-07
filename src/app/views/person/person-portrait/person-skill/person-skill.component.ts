import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Skill} from "../../../../models/common/skill";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-person-skill',
    templateUrl: './person-skill.component.html',
    styleUrls: ['./person-skill.component.scss']
})
export class PersonSkillComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showSkill: EventEmitter<Array<Skill>>;

    personSkillList: Array<Skill>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.personSkillList = new Array<Skill>();
        this.showSkill.asObservable().subscribe(skillList => {
            this.personSkillList = skillList;
        });
    }

}
