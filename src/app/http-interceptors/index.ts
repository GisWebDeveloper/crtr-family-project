/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from "./auth.interceptor";
import {SpinnerInterceptor} from "./spinner.interceptor";

/** Http interceptor providers in outside-in order */
export const HTTP_INTERCEPTORS_PROVIDERS = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
];
