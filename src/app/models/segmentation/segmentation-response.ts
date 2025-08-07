import {SegmentationStatItem} from "./segmentation-stat-item";
import {PageResponse} from "../page-response";
import {SegmentationListItem} from "./segmentation-list-item";

export class SegmentationResponse extends PageResponse {

    public filterStatList: Array<SegmentationStatItem>;
    public regionStatList: Array<SegmentationStatItem>;
    public familyDetailList: Array<SegmentationListItem>;

}
