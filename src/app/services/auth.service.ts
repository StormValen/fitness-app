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
            userId: Math.round(Math.random() * 1000).toString() // FIXME: -> userId must not be a random number.
        }
        this.createUserLocalStorage(authData, this.user.userId);
        this.authSuccessRedirectTo('training');
    }

    login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.createUserLocalStorage(authData, this.user.userId);
        this.authSuccessRedirectTo('training');
    }

    logout(): void {
        this.user = null;
        this.deleteUserLocalStorage();
        this.authSuccessRedirectTo('login');
    }

    getSession(): void {
        this.readUserLocalStorage();
    }

    getUser(): User {
        return { ...this.user };
    }

    isAuth(): boolean {
        return this.user != null;
    }

    private createUserLocalStorage(authData: AuthData, id: string): void {
        localStorage.setItem('userEmail', authData.email);
        localStorage.setItem('userPassword', authData.password);
        localStorage.setItem('userId', id);
    }

    private readUserLocalStorage(): void {
        if (!this.user && localStorage.getItem('userEmail') && localStorage.getItem('userId')) {
            this.user = {
                email: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userId')
            }
            this.authSuccessRedirectTo('training');
        }
    }

    private updateUserLocalStorage(): void {
        // TODO:
    }

    private deleteUserLocalStorage(): void {
        localStorage.clear();
    }

    private authSuccessRedirectTo(route: string): void {
        this.authChange.next(this.user != null);
        this.router.navigate(['/', route]);
    }
}