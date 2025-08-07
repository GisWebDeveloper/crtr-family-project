import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Pass requests without access token inject
        const requestURL: string = request.url.toLowerCase();
        if (!requestURL.includes('/api/') || requestURL.includes('/api/auth/token')) {
            return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
        }

        // Get the auth token from the service.
        const accessTokenExpired = this.authService.isAccessTokenExpired();
        const refreshTokenExpired = this.authService.isRefreshTokenExpired();

        /*
        console.log('- intercept');
        console.log('accessTokenExpired = ', accessTokenExpired, ', refreshTokenExpired = ', refreshTokenExpired);
        console.log('access = ', this.authService.getStorageItem(AuthService.TOKEN_NAME));
        console.log('refresh = ', this.authService.getStorageItem(AuthService.REFRESH_TOKEN_NAME));*/

        if (accessTokenExpired && refreshTokenExpired) {
            this.authService.clearTokens();
            this.router.navigateByUrl(`/login`).then();
            return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));

        } else if (accessTokenExpired && !refreshTokenExpired) {

            if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                return this.authService.requestToken().pipe(
                    switchMap((authResponse) => {
                        this.authService.saveTokens(authResponse.accessToken, authResponse.refreshToken);
                        this.refreshTokenInProgress = false;
                        this.refreshTokenSubject.next(this.authService.getStorageItem(AuthService.REFRESH_TOKEN_NAME));
                        return next.handle(this.injectToken(request));
                    }),
                );

            } else {
                return this.refreshTokenSubject.pipe(
                    take(1),
                    switchMap((res) => {
                        return next.handle(this.injectToken(request));
                    })
                );
            }
        }
        return next.handle(this.injectToken(request)).pipe(catchError(x => this.handleAuthError(x)));
    }

    private injectToken(request: HttpRequest<any>) {
        const token = this.authService.getStorageItem(AuthService.TOKEN_NAME);
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            // navigate /delete cookies or whatever
            this.authService.clearTokens();
            this.router.navigateByUrl(`/login`).then();
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }
}
