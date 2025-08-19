import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Injectable} from "@angular/core";
import {UserRoleService} from "./user-role.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    constructor(private http: HttpClient,
                private router: Router,
                private userRoleService: UserRoleService) {
    }

    private static getServerUrl(): string {
        //let location = window.location;
        //return location.protocol + '//' + location.hostname + ':' + environment.serverPort;
        //return location.protocol + '//' + location.hostname + ':' + location.port;
        return environment.serverUrl;
    }

    public getApiUrl(): string {
        return HttpService.getServerUrl() + '/api';
    }

    get(url: string, params: any): Observable<any> {
        return this.http.get(this.getApiUrl() + url, params).pipe(
            catchError(err => {
                return throwError(err);
            }));
    }

    post(url: string, params: any): Observable<any> {
        return this.http.post(this.getApiUrl() + url, params).pipe(
            catchError(err => {
                return throwError(err);
            }));
    }

    login(params: any): Observable<any> {
        return this.http.post<any>(`${HttpService.getServerUrl()}/auth/login`, params)
            .pipe(
                tap(data => {
                    this.userRoleService.userRoles = [];
                    for (const i of data.user.roles) {
                        this.userRoleService.addUserRole(i.name);
                    }
                }),
                catchError(this.handleError('auth/login error'))
            );
    }

    changePassword(params: any): Observable<any> {
        return this.http.post<any>(`${HttpService.getServerUrl()}/auth/password`, params)
            .pipe(
                tap(data => {
                }),
                catchError(this.handleError('auth/password error'))
            );
    }

    token(tokenValue: any): Observable<any> {
        return this.http.get<any>(`${HttpService.getServerUrl()}/auth/token`, {
            headers: {'Authorization': `Bearer ${tokenValue}`}
        }).pipe(
            tap(data => {
            }),
            catchError(this.handleError('auth/token error'))
        );
    }

    private handleError<T>(operation = 'url') {
        return (error: any): Observable<T> => {
            if (error instanceof HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                    console.error("Error Event: ", error.error);
                } else {
                    console.log(`error status : ${error.status} / ${error.statusText} / ${operation}`);
                    switch (error.status) {
                        case 401:
                            this.router.navigate(['login']).then();
                            break;
                    }
                }
            }
            return throwError(error as T);
        };
    }
}
