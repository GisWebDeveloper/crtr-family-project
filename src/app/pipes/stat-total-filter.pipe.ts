import {Pipe, PipeTransform} from "@angular/core";
import {StatItem} from "../models/stat/stat-item";
import {StatItemBase} from "../models/stat/stat-item-base";
import {ReportDynamicTzhs} from "../models/report/report-dynamic-tzhs";
import {GovRepDeExtended} from "../models/report/gov-rep-de/gov-rep-de-extended";

@Pipe({name: "statTotalFilter"})
export class StatTotalFilterPipe implements PipeTransform {

    transform(items: Array<StatItem> | Array<StatItemBase> | Array<ReportDynamicTzhs> | Array<GovRepDeExtended>,  isTotal: boolean): any {
        if (!items) {
            return items;
        }
        // @ts-ignore
        return items.filter(item => item.isTotal === isTotal);
    }
}
