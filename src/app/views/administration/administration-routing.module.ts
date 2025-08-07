import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrationAppItemsComponent} from "./administration-app-items/administration-app-items.component";
import {AdministrationActionLogComponent} from "./administration-action-log/administration-action-log.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthService} from "../../services/auth.service";
import {Permissions} from "../../models/administration/permissions";
import {DatabaseUpdateComponent} from "./database-update/database-update.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'app-items',
            }, {
                path: 'app-items',
                component: AdministrationAppItemsComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.ADMINISTRATION_APP_ITEMS}
            }, {
                path: 'action-log',
                component: AdministrationActionLogComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.ADMINISTRATION_FAMILY_QUALITY}
            }, {
                path: 'db-update',
                component: DatabaseUpdateComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.ADMINISTRATION_FAMILY_QUALITY}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
