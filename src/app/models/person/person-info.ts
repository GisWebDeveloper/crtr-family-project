import {Document} from "./document";
import {Person} from "./person";
import {DictionaryCommon} from "../dictionary-common";

export class PersonInfo {

    public attrDictionary: DictionaryCommon | undefined;
    public document: Document;
    public factAddress: string | undefined;
    public person: Person;
    public personPhoneNumber: string;

}
