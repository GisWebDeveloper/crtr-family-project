import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRoleService} from "../services/user-role.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userRoleService: UserRoleService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean {

        if (this.userRoleService.hasPermission(route.data['permission'])) {
            return true;
        } else {
            this.router.navigate(['/unauthorized']);
            return false;
        }
    }

}
