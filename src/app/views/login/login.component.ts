import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";
import {UserRoleService} from "../../services/user-role.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: string = 'LOGIN';
    loginForm: FormGroup;
    passwordForm: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private userRoleService: UserRoleService,
                private utilService: UtilService) {

        this.loginForm = new FormGroup({
            username: new FormControl(null),
            password: new FormControl(null),
        });

        this.passwordForm = new FormGroup({
            username: new FormControl(null),
            password: new FormControl(null),
            newPassword: new FormControl(null),
            confirmPassword: new FormControl(null)
        });
    }

    ngOnInit(): void {

    }

    get lForm() {
        return this.loginForm.controls;
    }

    get pForm() {
        return this.passwordForm.controls;
    }

    changeForm(form: string) {
        this.form = form;
    }

    login() {
        let errorText = '';
        const usernameValue = this.lForm['username'].value;
        const passwordValue = this.lForm['password'].value;
        if (this.loginForm.valid && usernameValue && passwordValue) {
            this.authService.login({username: usernameValue, password: passwordValue}).subscribe({
                next: response => {
                    this.processLoginResponse(response);
                }, error: errorResponse => {
                    errorText = this.utilService.getErrorMessage(errorResponse);
                    this.utilService.notifyError(errorText);
                }
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
                this.pForm['confirmPassword'].setErrors({notValid: true});
                this.utilService.notifyError('Новые пароли не совпадают');
                return;
            }

            const request = {
                username: usernameValue, password: passwordValue, passwordNew: newPasswordValue,
                passwordConfirm: confirmPasswordValue
            }
            this.authService.changePassword(request).subscribe({
                next: response => {
                    this.processLoginResponse(response);
                }, error: errorResponse => {
                    this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
                }
            });
        } else {
            this.utilService.notifyError('Заполните учетные данные')
        }
    }

    private processLoginResponse(response: any) {
        const serverTimeDiff = (new Date()).getTime() - response.serverTime;
        this.authService.isLoggedIn = true;
        this.authService.saveUserAuth(response.user, serverTimeDiff);
        this.authService.saveTokens(response.accessToken, response.refreshToken);

        // route to accessed page
        const routePath: string = this.userRoleService.getRoutePath();
        this.router.navigate([routePath]).then();

        //password expiring date notify
        let date = this.utilService.stringToDate(response['user']['passwordExpireDate'], 'DD.MM.YYYY HH:mm:ss');
        let dateFormatted = date?.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'});
        this.utilService.notifySuccess('Ваш пароль действителен до ' + (dateFormatted ? dateFormatted : date));
    }

}
