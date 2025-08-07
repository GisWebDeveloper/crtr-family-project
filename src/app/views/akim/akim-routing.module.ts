import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AkimMemberComponent} from "./akim-member/akim-member.component";

const routes: Routes = [
    // {
    //     path: '',
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: 'member',
    //         }, {
    //             path: 'member',
    //             component: AkimMemberComponent,
    //             canActivate: [AuthGuard],
    //             // data: {permission: Permissions.PERMISSIONS.AKIM_PAGE}
    //         }
    //     ]
    // }
    {
        path: '',
        component: AkimMemberComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AkimRoutingModule { }
