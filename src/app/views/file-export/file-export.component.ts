import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import * as FileSaver from "file-saver";
import {FileExportService} from "../../services/file-export.service";

@Component({
    selector: 'app-info-from-iin-excel',
    templateUrl: './file-export.component.html',
    styleUrls: ['./file-export.component.scss']
})
export class FileExportComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    hasUploadedFile: boolean = false;

    constructor(private fileExportService: FileExportService,
                private formBuilder: FormBuilder,
                private utilService: UtilService) {
        this.form = this.formBuilder.group({
            file: ['', Validators.required],
            reason: ['', Validators.required],
            fileSource: []
        })
    }

    ngOnInit(): void {
        this.getFileStatus();
    }

    getFileStatus() {
        this.fileExportService.getFileStatus().subscribe({
            next: response => {
                this.hasUploadedFile = response && response.isActive == 1;

                if (this.hasUploadedFile) {
                    this.form.disable();
                } else {
                    this.form.enable();
                }
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    onSubmit() {
        const formData = new FormData();
        const file: File = this.form.get('fileSource')?.value;
        const reason: string = this.form.get('reason')?.value;
        formData.append('file', file, file.name);
        formData.append('comment', reason);

        this.fileExportService.uploadFile(formData).subscribe({
            next: response => {
                this.utilService.notifySuccess("Файл загружен");
                this.getFileStatus();
            }, error: reportError => {
                this.utilService.displayError(reportError);
                this.getFileStatus();
            }
        });


    }

    get formControl() {
        return this.form.controls;
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.form.patchValue({
                    fileSource: event.target.files[0]
                }
            );
        }
    }

    downloadResult() {
        this.fileExportService.downloadFileExportResult().subscribe(response => {
            this.form.reset();
            FileSaver.saveAs(response, 'result.xlsx');
            this.getFileStatus();

        });
    }

    resetField() {
        this.form.reset();
    }
}
