import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.createLoginForm();
    }

    private createLoginForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(
                '', 
                { validators: [
                    Validators.email, 
                    Validators.required] 
                }
            ),
            password: new FormControl(
                '', 
                { validators: [
                    Validators.minLength(8), 
                    Validators.required] 
                }
            )
        });
    }

    onSubmit(): void {
        console.log(this.loginForm);
    }

}
