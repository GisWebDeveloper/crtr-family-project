import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "phone"})
export class PhonePipe implements PipeTransform {

    transform(rawNum: string) {
        let result = rawNum;
        if (rawNum && rawNum.length > 0) {
            const countryCodeStr = "+" + rawNum.slice(0, 1);
            const operatorCodeStr = rawNum.slice(1, 4);
            const areaCodeStr = rawNum.slice(4, 7);
            const midSectionStr = rawNum.slice(7, 9);
            const lastSectionStr = rawNum.slice(9);
            result = `${countryCodeStr} (${operatorCodeStr}) ${areaCodeStr}-${midSectionStr}-${lastSectionStr}`;
        }
        return result;
    }
}
