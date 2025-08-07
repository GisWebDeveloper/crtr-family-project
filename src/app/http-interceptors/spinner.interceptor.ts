import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import * as Notiflix from 'notiflix';

@Injectable()
export class SpinnerInterceptor implements SpinnerInterceptor {

    count = 0;

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const requestURL: string = request.url.toLowerCase();
        if (!requestURL.includes('/api/') || requestURL.includes('/api/auth/token') || requestURL.includes('api/card/findphonebyiin')) {
            return next.handle(request);
        } else {
            this.count++;
            Notiflix.Loading.standard({
                backgroundColor: 'rgb(242, 242, 242, 0.5)'
            });
            return next.handle(request)
                .pipe(tap(), finalize(() => {
                        this.count--;
                        if (this.count === 0) {
                            Notiflix.Loading.remove();
                        }
                    })
                );
        }
    }
}
