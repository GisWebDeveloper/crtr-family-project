import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {HttpService} from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public onLogin = new Subject<boolean>();
    private _isLoggedIn = false;
    public readonly DEMO_USER_ID = 55;
    //public accessToken: any;
    //public user: any;

    public static readonly TOKEN_NAME: string = 'accessToken';
    public static readonly REFRESH_TOKEN_NAME: string = 'refreshToken';

    constructor(private httpService: HttpService,
                private router: Router) {
    }

    set isLoggedIn(loggedIn) {
        this._isLoggedIn = loggedIn;
        this.onLogin.next(loggedIn);
    }

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    public login(params: any): Observable<any> {
        return this.httpService.login(params);
    }

    public changePassword(params: any): Observable<any> {
        return this.httpService.changePassword(params);
    }

    public logout() {
        //this.user = null;
        this.isLoggedIn = false;
        localStorage.clear();
        this.router.navigate(['login']).then();
    }

    requestToken() {
        const refreshTokenValue = this.getStorageItem(AuthService.REFRESH_TOKEN_NAME);
        return this.httpService.token(refreshTokenValue);
    }

    getStorageItem(name: string): string {
        return localStorage.getItem(name) || "";
    }

    saveTokens(tokenValue: string, refreshTokenValue: string) {
        localStorage.setItem(AuthService.TOKEN_NAME, tokenValue);
        localStorage.setItem(AuthService.REFRESH_TOKEN_NAME, refreshTokenValue);
    }

    clearTokens() {
        localStorage.removeItem(AuthService.TOKEN_NAME);
        localStorage.removeItem(AuthService.REFRESH_TOKEN_NAME);
    }

    private getUserAuthObject() {
        const userAuthValue = localStorage.getItem('userAuth');
        return JSON.parse(userAuthValue != null ? userAuthValue : '{}');
    }

    saveUserAuth(userAuthObject: any, serverTimeDiff: number) {
        localStorage.setItem('userAuth', JSON.stringify(userAuthObject));
        localStorage.setItem('serverTimeDiff', String(serverTimeDiff));
    }

    isAccessTokenExpired(): boolean {
        const accessToken = AuthService.getDecodedAccessToken(this.getStorageItem(AuthService.TOKEN_NAME));
        if (accessToken) {
            const serverTimeDiff = Number(localStorage.getItem('serverTimeDiff'));
            const tokenExpLimit = (new Date()).getTime() - (serverTimeDiff || 0) - 5000;
            return (accessToken.exp * 1000 < tokenExpLimit);
        } else {
            return true;
        }
    }

    isRefreshTokenExpired(): boolean {
        const refreshToken = AuthService.getDecodedAccessToken(this.getStorageItem(AuthService.REFRESH_TOKEN_NAME));
        if (refreshToken) {
            const serverTimeDiff = Number(localStorage.getItem('serverTimeDiff'));
            const tokenExpLimit = (new Date()).getTime() - (serverTimeDiff || 0) - 5000;
            return (refreshToken.exp * 1000 < tokenExpLimit);
        } else {
            return true;
        }
    }

    public getUserId(): number {
        const userAuth = this.getUserAuthObject();
        return userAuth ? userAuth.userId : undefined;
    }

    public getUserRegion(): string {
        const userAuth = this.getUserAuthObject();
        return userAuth ? userAuth.branchName : '';
    }

    private static getDecodedAccessToken(token: string): any {
        try {
            return token ? jwt_decode(token) : null;
        } catch (Error) {
            return null;
        }
    }
}
