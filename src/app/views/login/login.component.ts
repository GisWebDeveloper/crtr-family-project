import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import {TranslateService} from '@ngx-translate/core';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: string = 'LOGIN';
    loginForm: FormGroup;
    passwordForm: FormGroup;
    showPassword: boolean = false;
    showNewPassword: boolean = false;
    showConfirmPassword: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private userRoleService: UserRoleService,
        private utilService: UtilService,
        public translateService: TranslateService
    ) {
        this.loginForm = new FormGroup({
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
        });

        this.passwordForm = new FormGroup({
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
            newPassword: new FormControl(null, [Validators.required]),
            confirmPassword: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit(): void {
        const savedLang = localStorage.getItem('appLang') || 'ru';
        this.translateService.use(savedLang);
    }

    get lForm() {
        return this.loginForm.controls;
    }

    get pForm() {
        return this.passwordForm.controls;
    }

    setCurrentLang(lang:string):void{
        this.translateService.use(lang);
        localStorage.setItem('appLang', lang);
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return field ? field.invalid && (field.dirty || field.touched) : false;
    }

    isPasswordFieldInvalid(fieldName: string): boolean {
        const field = this.passwordForm.get(fieldName);
        return field ? field.invalid && (field.dirty || field.touched) : false;
    }

    changeForm(form: string) {
        this.form = form;
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    toggleNewPasswordVisibility(): void {
        this.showNewPassword = !this.showNewPassword;
    }

    toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    login() {
        let errorText = '';
        const usernameValue = this.lForm['username'].value;
        const passwordValue = this.lForm['password'].value;
        if (this.loginForm.valid && usernameValue && passwordValue) {
            this.authService
                .login({ username: usernameValue, password: passwordValue })
                .subscribe({
                    next: (response) => {
                        this.processLoginResponse(response);
                    },
                    error: (errorResponse) => {
                        errorText =
                            this.utilService.getErrorMessage(errorResponse);
                        this.utilService.notifyError(errorText);
                    },
                });
        } else {
            errorText = 'Заполните учетные данные';
            this.utilService.notifyError(errorText);
        }
    }

    changePassword() {
        if (this.passwordForm.valid) {
            const usernameValue = this.pForm['username'].value;
            const passwordValue = this.pForm['password'].value;
            const newPasswordValue = this.pForm['newPassword'].value;
            const confirmPasswordValue = this.pForm['confirmPassword'].value;
            if (newPasswordValue !== confirmPasswordValue) {
                this.pForm['confirmPassword'].setErrors({ notValid: true });
                this.utilService.notifyError('Новые пароли не совпадают');
                return;
            }

            const request = {
                username: usernameValue,
                password: passwordValue,
                passwordNew: newPasswordValue,
                passwordConfirm: confirmPasswordValue,
            };
            this.authService.changePassword(request).subscribe({
                next: (response) => {
                    this.processLoginResponse(response);
                },
                error: (errorResponse) => {
                    this.utilService.notifyError(
                        this.utilService.getErrorMessage(errorResponse)
                    );
                },
            });
        } else {
            this.utilService.notifyError('Заполните учетные данные');
        }
    }

    private processLoginResponse(response: any) {
        const serverTimeDiff = new Date().getTime() - response.serverTime;
        this.authService.isLoggedIn = true;
        this.authService.saveUserAuth(response.user, serverTimeDiff);
        this.authService.saveTokens(
            response.accessToken,
            response.refreshToken
        );

        // route to accessed page
        const routePath: string = this.userRoleService.getRoutePath();
        this.router.navigate([routePath]).then();

        //password expiring date notify
        let date = this.utilService.stringToDate(
            response['user']['passwordExpireDate'],
            'DD.MM.YYYY HH:mm:ss'
        );
        let dateFormatted = date?.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        this.utilService.notifySuccess(
            'Ваш пароль действителен до ' +
                (dateFormatted ? dateFormatted : date)
        );
    }
}
