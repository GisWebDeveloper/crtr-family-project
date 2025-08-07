import {AppItem} from "./app-item";
import {RoleAppItem} from "./role-app-item";
import {Role} from "../role";

export class AppItemsRequest {

    public action: string;
    public appItemList: Array<AppItem>;
    public roleItemList: Array<RoleAppItem>;
    public roleList: Array<Role>;

}
