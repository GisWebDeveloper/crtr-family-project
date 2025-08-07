import {SegmentationStatItem} from "./segmentation-stat-item";
import {SegmentationFilter} from "./segmentation-filter";

export class SegmentationStatItemDescription {

    public id: number;
    public label: string;
    public filter: SegmentationFilter;
    public statItem: SegmentationStatItem;

}
