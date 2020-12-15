import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "../models/auth-data.model";
import { User } from "../models/user.model";

import { AuthHelperService } from './auth-helper.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
        private authHelper: AuthHelperService,
    ) { }

    signup(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString() // FIXME: -> userId must not be a random number.
        }

        this.authHelper.createUserLocalStorage(authData.email, this.user.userId); // TODO: delete when not needed
        this.authSuccessRedirectTo('training');
    }

    login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authHelper.createUserLocalStorage(authData.email, this.user.userId); // TODO: delete when not needed
        this.authSuccessRedirectTo('training');
    }

    logout(): void {
        this.user = null;
        this.authHelper.deleteUserLocalStorage(); // TODO: delete when not needed
        this.authSuccessRedirectTo('login');
    }

    getSession(): void {
        this.user = this.authHelper.readUserLocalStorage(); // TODO: delete when not needed
        if (this.user) {
            this.authSuccessRedirectTo('training');
        }
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