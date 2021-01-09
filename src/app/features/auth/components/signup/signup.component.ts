import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';

import * as fromRoot from '../../../../app.reducer';

const MIN_REQUIRED_AGE = 18;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    maxDate: Date;
    isLoading$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.createSignupForm();
        this.initializeSignupMaxDate();
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    }

    onSubmit(): void {
        this.authService.signup({
            email: this.signupForm.value.email,
            password: this.signupForm.value.password
        });
    }

    private createSignupForm(): void {
        this.signupForm = new FormGroup({
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
            ),
            birthdate: new FormControl(
                '',
                { validators: [
                    Validators.required
                ]}
            ),
            agreeTerms: new FormControl(
                '',
                { validators: [
                    Validators.required
                ]}
            ),
        });
    }

    private initializeSignupMaxDate(): void {
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - MIN_REQUIRED_AGE);
    }

}
