import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.createLoginForm();
        this.authService.getSession();
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
