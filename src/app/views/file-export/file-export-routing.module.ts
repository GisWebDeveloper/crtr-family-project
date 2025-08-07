import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FileExportComponent} from "./file-export.component";

const routes: Routes = [
    {
        path: '',
        component: FileExportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FileExportRoutingModule {
}
