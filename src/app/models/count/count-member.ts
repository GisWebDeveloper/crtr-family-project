import {Dictionary} from "../dictionary";

export class CountMember {

    public id: number;
    public iin: string;
    public countDictionary: Dictionary;
    public description: string;

    public actionCode?: string;
    public actionDescription?: string;
    public isConfirmation?: string;

}
