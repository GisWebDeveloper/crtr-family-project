import {Dictionary} from "../dictionary";

export class AppItem {

    public id: number;
    public appItemType: Dictionary;
    public appItemTypeId: number;
    public code: string;
    public dateFrom: string;
    public dateTo: string;
    public nameRu: string;
    public parentId: number;

    public checked?: boolean;

}
