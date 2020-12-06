import { Component, OnInit } from '@angular/core';
import { 
    FormControl, 
    FormGroup,
    Validators 
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

const MIN_REQUIRED_AGE = 18;

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
    signupForm: FormGroup;
    maxDate: Date;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.createSignupForm();
        this.initializeSignupMaxDate();
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
