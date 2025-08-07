import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileExportService {

    constructor(private httpService: HttpService) {
    }

    downloadFileExportResult() {
        return this.httpService.get(this.buildUrl2('/fileExport/getResult', {}), {responseType: 'blob'});
    }

    uploadFile(formData: FormData) {
        return this.httpService.post('/fileExport/insert', formData);
    }

    getFileStatus() : Observable<{fileName: string, isActive: number, comment: string}> {
        return this.httpService.get('/fileExport/getStatus', {});
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
}
