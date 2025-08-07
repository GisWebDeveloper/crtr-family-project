export class Dictionary {

    public id: number;
    public code: string;
    public nameRu: string;
    public nameKz: string;

    public order?: number;
    public type?: string;
    public disabled?: boolean;
    public parentId?: number;

    constructor(id: number, code: string, nameRu: string, nameKz: string) {
        this.id = id;
        this.code = code;
        this.nameRu = nameRu;
        this.nameKz = nameKz;
    }
}
