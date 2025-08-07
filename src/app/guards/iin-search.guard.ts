import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRoleService} from "../services/user-role.service";
import {Permissions} from "../models/administration/permissions";
import {AvailableIinsService} from "../services/available-iins.service";

@Injectable({
    providedIn: 'root'
})
export class IinSearchGuard implements CanActivate {

    constructor(private userRoleService: UserRoleService,
                private router: Router,
                private availableIinsService: AvailableIinsService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

         //if (this.userRoleService.hasPermission(Permissions.PERMISSIONS.SEARCH_IIN) || this.availableIinsService.hasIin(route.paramMap.get('iin') || '')) {
        if (this.availableIinsService.hasIin(route.paramMap.get('iin') || '')) {
            return true;
        } else {
            this.router.navigate(['/unauthorized']);
            return false;
        }
    }

}
