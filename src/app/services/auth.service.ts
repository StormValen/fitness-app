import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "../models/auth-data.model";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) { }

    signup(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authSuccessRedirectTo('training');
    }

    login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authSuccessRedirectTo('training');
    }

    logout(): void {
        this.user = null;
        this.authSuccessRedirectTo('/welcome');
    }

    getUser(): User {
        return { ...this.user };
    }

    isAuth(): boolean {
        return this.user != null;
    }

    private authSuccessRedirectTo(route: string): void {
        this.authChange.next(this.user != null);
        this.router.navigate(['/', route]);
    }
}