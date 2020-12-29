import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthService } from '../../services/auth.service';

import * as fromApp from '../../../../app.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<{ui: fromApp.State}>
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.store.map(state => state.ui.isLoading);
        this.createLoginForm();
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
}
