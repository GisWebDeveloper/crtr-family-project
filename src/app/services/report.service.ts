import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {NeedJournalRequest} from "../models/monitoring/need-journal-request";
import {ReportNeedActionsCategory} from "../models/report/report-na-category";
import * as XLSX from "xlsx";
import {ReportNeedActionsRegion} from "../models/report/report-na-region";
import * as FileSaver from "file-saver";
import {ReportProactiveSmsRegion} from "../models/report/report-ps-region";
import {ReportProactiveSmsCategory} from "../models/report/report-ps-category";
import {ReportItemPageResponse} from "../models/report/report-item-page-response";
import {ReportItemPageRequest} from "../models/report/report-item-page-request";
import {ReportEmployables} from "../models/report/report-employables";
import {CountPageRequest} from "../models/count/count-page-request";
import {ReportMonGarden} from "../models/report/report-mon-garden";
import {ReportMonSchool} from "../models/report/report-mon-school";
import {ReportMfIp} from "../models/report/report-mf-ip";
import {ReportMiorNeet} from "../models/report/report-mior-neet";
import {ReportMzOsms} from "../models/report/report-mz-osms";
import {ReportMvd} from "../models/report/report-mvd";
import {ReportDynamicMonGarden} from "../models/report/report-dynamic-mon-garden";
import {ReportDynamicMonSchool} from "../models/report/report-dynamic-mon-school";
import {ReportDynamicMiorNeet} from "../models/report/report-dynamic-mior-neet";
import {ReportDynamicMzOsms} from "../models/report/report-dynamic-mz-osms";
import {ReportDynamicPageRequest} from "../models/report/report-dynamic-page-request";
import {ReportSmsItemPageResponse} from "../models/report/report-sms-item-page-response";
import {PovertyRating} from "../models/report/report-region-rating/poverty-rating";
import {ReportRegionRanking} from "../models/report/report-region-rating/report-region-ranking";
import {UtilService} from "./util.service";
import {ReportDynamicMfIp} from "../models/report/report-dynamic-mf-ip";
import {KandasStatPageRequest} from "../models/kandas/kandas-stat-page-request";
import {ReportDynamicTzhs} from "../models/report/report-dynamic-tzhs";
import {GovRepDeStat} from "../models/report/gov-rep-de/gov-rep-de-stat";
import {KandasFamilyTzhsMonitoring} from "../models/report/kandas-fam-tzhs-mon/kandas-family-tzhs-monitoring";
import {ReportActualization} from "../models/report/report-actualization";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
//TODO remove fileExport methods to separate service
    constructor(private httpService: HttpService, private router: Router,
                private utilService: UtilService) {
    }

    getGoDEDates(): Observable<string[]> {
        return this.httpService.get('/report/repGoDE/dates', {});
    }

    downloadCountPersonListUrl(params: any, filename: string) {
        this.httpService.get(this.buildUrl2('/download/person-list-count', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadBeneficiaryListUrl(params: any, filename: string) {
        this.httpService.get(this.buildUrl2('/download/beneficiary/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadStatusPersonListUrl(params: any, filename: string) {
        this.httpService.get(this.buildUrl2('/download/person-list-status', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    // downloadStatusPersonListUrl(params: any) {
    //     return this.buildUrl2(this.httpService.getApiUrl() + '/download/person-list-status', params);
    // }

    downloadFamilyCardPdf(iin: string, params: any) {
        return this.httpService.get('/download/pdf/family/' + iin, params);
    }

    downloadPersonCardPdf(iin: string, params: any) {
        return this.httpService.get('/download/pdf/person/' + iin, params);
    }

    getRegionRantingReport(param: string): Observable<ReportRegionRanking<PovertyRating>> {
        return this.httpService.post('/report/rating', param);
    }

    getNeedActionsReport(params: NeedJournalRequest): Observable<Array<ReportNeedActionsRegion>> {
        return this.httpService.post('/report/need-actions', params);
    }

    getNeedActionsCategoryReport(params: NeedJournalRequest): Observable<Array<ReportNeedActionsCategory>> {
        return this.httpService.post('/report/need-actions/category', params);
    }

    getProactiveSmsRegionReport(params: ReportItemPageRequest): Observable<Array<ReportProactiveSmsRegion>> {
        return this.httpService.post('/report/proactive-sms', params);
    }

    getProactiveSmsCategoryReport(params: ReportItemPageRequest): Observable<Array<ReportProactiveSmsCategory>> {
        return this.httpService.post('/report/proactive-sms/category', params);
    }

    getProactiveSmsCategoryPage(params: ReportItemPageRequest): Observable<ReportSmsItemPageResponse> {
        return this.httpService.post('/report/proactive-sms/page', params);
    }

    getReportEmployables(params: CountPageRequest): Observable<Array<ReportEmployables>> {
        return this.httpService.post('/report/employables', params);
    }

    getReportMonGarden(params: CountPageRequest): Observable<Array<ReportMonGarden>> {
        return this.httpService.post('/report/mon/grd', params);
    }

    getReportDynamicMonGarden(params: CountPageRequest): Observable<Array<ReportDynamicMonGarden>> {
        return this.httpService.post('/report/dynamic/mon/grd', params);
    }

    getReportMonSchool(params: CountPageRequest): Observable<Array<ReportMonSchool>> {
        return this.httpService.post('/report/mon/sch', params);
    }

    getReportDynamicMonSchool(params: CountPageRequest): Observable<Array<ReportDynamicMonSchool>> {
        return this.httpService.post('/report/dynamic/mon/sch', params);
    }

    getReportMfIp(params: CountPageRequest): Observable<Array<ReportMfIp>> {
        return this.httpService.post('/report/mf/ip', params);
    }

    getReportDynamicMfIp(params: CountPageRequest): Observable<Array<ReportDynamicMfIp>> {
        return this.httpService.post('/report/dynamic/mf/ip', params);
    }

    getReportMvd(params: CountPageRequest): Observable<Array<ReportMvd>> {
        return this.httpService.post('/report/mvd/ip', params);
    }

    getReportMiorNeet(params: CountPageRequest): Observable<Array<ReportMiorNeet>> {
        return this.httpService.post('/report/mior/neet', params);
    }

    getReportDynamicMiorNeet(params: CountPageRequest): Observable<Array<ReportDynamicMiorNeet>> {
        return this.httpService.post('/report/dynamic/mior/neet', params);
    }

    getReportMzOsms(params: CountPageRequest): Observable<Array<ReportMzOsms>> {
        return this.httpService.post('/report/mz/osms', params);
    }

    getReportDynamicMzOsms(params: CountPageRequest): Observable<Array<ReportDynamicMzOsms>> {
        return this.httpService.post('/report/dynamic/mz/osms', params);
    }

    getReportDynamicPage(param: any): Observable<ReportItemPageResponse> {
        return this.httpService.post("/report/dynamic/page", param);
    }

    getReportDynamicCntIds(param: string): Observable<number[]> {
        return this.httpService.post("/report/dynamic/cntIds", param);
    }

    getReportEmployablesPage(params: ReportItemPageRequest): Observable<ReportItemPageResponse> {
        return this.httpService.post('/report/employables/page', params);
    }

    getReportRegionRatingPage(params: ReportItemPageRequest): Observable<ReportItemPageResponse> {
        return this.httpService.post('/report/rating/page', params);
    }

    getReportKandasFamilyTzhsMonitoring(params: {districtId: number | null, regionId: number | null}): Observable<KandasFamilyTzhsMonitoring> {
        return this.httpService.post('/report/famTzhsDynamic', params);
    }

    getReportDynamicTzhs(year: string): Observable<ReportDynamicTzhs[]> {
        return this.httpService.post('/report/dynamicTzhs', year);
    }

    getReportDynamicTzhsPage(param: ReportItemPageRequest): Observable<ReportItemPageResponse> {
        return this.httpService.post('/report/dynamicTzhs/page', param);
    }

    getReportGoDEPage(param: ReportItemPageRequest): Observable<ReportItemPageResponse> {
        return this.httpService.post('/report/repGoDE/page', param);
    }

    getReportGoDE(param: { nameId: number, date: string | undefined }): Observable<GovRepDeStat> {
        return this.httpService.post('/report/repGoDE', param);
    }

    getReportActualization(param: {date: string | null}): Observable<ReportActualization[]> {
        return this.httpService.post('/report/actualization', param);
    }

    getReportActualizationDates(): Observable<string[]> {
        return this.httpService.get('/report/actualization/dates', {});
    }

    getReportMigration(): Observable<any[]> {
        return this.httpService.post('/report/migration', {});
    }

    getReportMigrationStatPage(param: any): Observable<any> {
        return this.httpService.post('/report/migration/page', param);
    }

    downloadStatPersonList(params: any, filename: string) {
        this.httpService.get(this.buildUrl2('/download/person-list-stat', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadProactiveSmsPersonList(params: ReportItemPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/proactive-sms/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadEmployablePersonList(params: ReportItemPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/employables/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadReportDynamicList(params: ReportDynamicPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/report/dynamic/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadRegionRatingList(params: ReportItemPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/report/rating/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadKandasList(params: KandasStatPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/kandas/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadReportDynamicTzhsList(params: ReportItemPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/report/dynamicTzhs/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadSegmentationList(params: ReportItemPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/segmentation/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    downloadReportGoDEList(params: ReportItemPageRequest, filename: string) {
        this.httpService.get(this.buildUrl2('/download/repGoDE/list', params), {responseType: 'blob'}).subscribe(response => {
            this.saveToFile(response, filename);
        });
    }

    saveToFile(data: Blob, filename: string) {
        //@ts-ignore
        FileSaver.saveAs(data, filename);
    }

    public buildUrl(url: string, parameters: any) {
        let qs = '';
        for (const key of parameters) {
            const value = parameters[key];
            if (value) {
                qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1); // chop off last "&"
            url = url + '?' + qs;
        }
        return url;
    }

    public buildUrl2(url: string, parameters: any) {
        let qs = '';
        Object.keys(parameters).forEach(key => {
            let value = parameters[key];
            qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        });
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1); // chop off last "&"
            url = url + '?' + qs;
        }
        return url;
    }

    public exportTableToExcel(tableId: string, reportName?: string) {
        /* pass here the table id */
        const originalElement = document.getElementById(tableId);
        if (!originalElement) {
            return;
        }
        const element = this.processNgselectTags(originalElement.cloneNode(true) as HTMLElement);

        this.stringToNumber(element);
        const workSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const workBook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

        /* save to file */
        XLSX.writeFile(workBook, (reportName || 'report') + '.xlsx');

    }

    private processNgselectTags(element: HTMLElement) {
        const inputs = element.querySelectorAll('ng-select');

        inputs.forEach(input => {
            // @ts-ignore
            const textNode = document.createTextNode(input.childNodes[0].firstChild.textContent.slice(1) || '');

            // @ts-ignore
            input.parentElement.replaceChild(textNode, input);
        })

        return element;
    }

    private stringToNumber(element: HTMLElement | null) {
        if (element) {
            let trElements = element.querySelectorAll('tr');
            if (trElements) {
                for (let i = 0; i < trElements.length; i++) {
                    let trElement = trElements.item(i);
                    let tdOrThElements = trElement.querySelectorAll('td');
                    if (tdOrThElements.length == 0) {
                        tdOrThElements = trElement.querySelectorAll('th');
                    }
                    for (let j = 0; j < tdOrThElements.length; j++) {
                        let tdElement = tdOrThElements.item(j);
                        let aElement = tdElement.querySelector('a');
                        if (aElement) {
                            let value = aElement.textContent;
                            if (value && /^\d{1,3}(\s\d{3})*$/.test(value.trim())) {
                                let number = parseInt(value.replace(/\s/g, ''));
                                aElement.textContent = '' + number;
                            }
                        } else {
                            let value = tdElement.textContent;
                            if (value && /^\d{1,3}(\s\d{3})*$/.test(value.trim())) {
                                let number = parseInt(value.replace(/\s/g, ''));
                                tdElement.textContent = '' + number;
                            }
                        }
                    }
                }
            }
        }
    }

    // private formatNumber(element: HTMLElement | null) {
    //     if (element) {
    //         let trElements = element.querySelectorAll('tr');
    //         if (trElements) {
    //             for (let i = 0; i < trElements.length; i++) {
    //                 let trElement = trElements.item(i);
    //                 let tdOrThElements = trElement.querySelectorAll('td');
    //                 if (tdOrThElements.length == 0) {
    //                     tdOrThElements = trElement.querySelectorAll('th');
    //                 }
    //                 for (let j = 0; j < tdOrThElements.length; j++) {
    //                     let tdElement = tdOrThElements.item(j);
    //                     let aElement = tdElement.querySelector('a');
    //                     if (aElement) {
    //                         let value = aElement.textContent?.trim();
    //                         if (value && /^\d+$/.test(value)) {
    //                             let number = this.utilService.numberFormat(parseInt(value));
    //                             aElement.textContent = '' + number;
    //                         }
    //                     } else {
    //                         let value = tdElement.textContent?.trim();
    //                         if (value && /^\d+$/.test(value)) {
    //                             let number = this.utilService.numberFormat(parseInt(value));
    //                             tdElement.textContent = '' + number;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

}
