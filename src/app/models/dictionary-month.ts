import {Dictionary} from "./dictionary";

export class DictionaryMonth extends Dictionary {

    public year: number;
    public month: number;

    constructor(id: number, code: string, nameRu: string, nameKz: string, year: number, month: number) {
        super(id, code, nameRu, nameKz);
        this.year = year;
        this.month = month;
    }
}
