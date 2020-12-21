import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { UIService } from 'src/app/services/ui.service';

const MIN_REQUIRED_AGE = 18;

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit, OnDestroy {
    signupForm: FormGroup;
    maxDate: Date;
    loading: boolean = false;
    private loadingSubs: Subscription;

    constructor(
        private authService: AuthService,
        private uiService: UIService
    ) { }

    ngOnInit(): void {
        this.createSignupForm();
        this.initializeSignupMaxDate();
        this.loadingSubs = this.uiService.loadingStateChanged
            .subscribe(loading => {
                this.loading = loading;
            })
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

    ngOnDestroy(): void {
        this.loadingSubs.unsubscribe();
    }

}
