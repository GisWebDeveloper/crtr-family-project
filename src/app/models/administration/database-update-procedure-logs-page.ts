import {PageRequest} from "../page-request";
import {UpdateDatabaseProcedureLog} from "./update-database-procedure-log";

export class DatabaseUpdateProcedureLogsPage extends PageRequest {

    public id: number;
    public total: number
    public data: UpdateDatabaseProcedureLog[];


}
