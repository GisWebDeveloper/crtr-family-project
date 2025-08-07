import {Dictionary} from "../dictionary";
import {ModalDescription} from "../modal-description";
import {Region} from "../region";

export class ReportModalDescription extends ModalDescription {

    public id: number | undefined;
    public countItem: Dictionary | undefined;
    public region: Region | undefined;
    public year: number | undefined;

}
