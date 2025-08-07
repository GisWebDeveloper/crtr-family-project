import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GovAgencyService {

    public static readonly MON_LIST_CODE_PREFIX = 'GO_MON_';
    public static readonly MON_LIST_GARDEN_CODE = 'GO_MON_GRD';
    public static readonly MON_LIST_SCHOOL_CODE = 'GO_MON_SCH';
    public static readonly MON_GARDEN_CODE_PREFIX = 'MON_GRD';
    public static readonly MON_SCHOOL_CODE_PREFIX = 'MON_SCH';
    public static readonly MON_GARDEN_CODE_50 = 'MON_GRD50';

    public static readonly MF_LIST_CODE_PREFIX = 'GO_MF_';
    public static readonly MF_LIST_IP_CODE = 'GO_MF_IP';
    public static readonly MF_IP_CODE_PREFIX = 'MF_IP';

    public static readonly MIOR_LIST_CODE_PREFIX = 'GO_MIOR_';
    public static readonly MIOR_LIST_NEET_CODE = 'GO_MIOR_NEET';
    public static readonly MIOR_NEET_CODE_PREFIX = 'MIOR_NEET';

    public static readonly MZ_LIST_CODE_PREFIX = 'GO_MZ_';
    public static readonly MZ_LIST_OSMS_CODE = 'GO_MZ_OSMS';
    public static readonly MZ_OSMS_CODE_PREFIX = 'MZ_OSMS';

    public static readonly ASP_CODE_PREFIX = 'S01020';

    public static readonly MVD_LIST_CODE_PREFIX = 'GO_MVD_';
    public static readonly MVD_LIST_IP_CODE = 'GO_MVD_IP';
    public static readonly MVD_IP_CODE_PREFIX = 'MVD_IP';

    public static readonly X_CATEGORY_PAR_ID = 1062;
    public static readonly X_CATEGORY_DICTIONARY_CODE_PREFIX = 'S8_CAT';
    public static readonly X_CATEGORY_CODE_PREFIX = 'S80';

    public static readonly D_CATEGORY_CODE_PREFIX = 'S8101';
    public static readonly E_CATEGORY_CODE_PREFIX = 'S8100';
    public static readonly DE_CATEGORY_DICTIONARY_CODE_PREFIX = 'S8_TZHS';

    constructor() {
    }

    public getMONListGardenCode() {
        return GovAgencyService.MON_LIST_GARDEN_CODE;
    }

    public getMONListSchoolCode() {
        return GovAgencyService.MON_LIST_SCHOOL_CODE;
    }

    public getMFListIPCode() {
        return GovAgencyService.MF_LIST_IP_CODE;
    }

    public getMIORListNEETCode() {
        return GovAgencyService.MIOR_LIST_NEET_CODE;
    }

    public getMZListOSMSCode() {
        return GovAgencyService.MZ_LIST_OSMS_CODE;
    }
}
