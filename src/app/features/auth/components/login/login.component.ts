import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UIService } from '../../../../shared/services/ui.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading: boolean = false;
    private loadingSubs: Subscription;

    constructor(
        private authService: AuthService,
        private uiService: UIService
    ) { }

    ngOnInit(): void {
        this.createLoginForm();
        this.loadingSubs = this.uiService.loadingLogin
            .subscribe(loading => {
                this.loading = loading;
            })
    }

    onSubmit(): void {
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        })
    }

    private createLoginForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(
                '',
                { validators: [
                    Validators.email,
                    Validators.required
                ]}
            ),
            password: new FormControl(
                '',
                { validators: [
                    Validators.minLength(8),
                    Validators.required
                ]}
            )
        });
    }

    ngOnDestroy(): void {
        if (this.loadingSubs) {
          this.loadingSubs.unsubscribe();
        }
    }

}
