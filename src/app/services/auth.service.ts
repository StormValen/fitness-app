import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "../models/auth-data.model";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(
        private router: Router,
        private auth: AngularFireAuth
    ) { }

    signup(authData: AuthData): void {
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                this.authSuccessRedirectTo('training');
            })
            .catch((err) => {
                // TODO: show up an error promt.
            })
    }

    login(authData: AuthData): void {
        this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                console.log('RES', response);
                this.authSuccessRedirectTo('training');
            })
            .catch((err) => {
                console.log('ERR', err);
                // TODO: show up an error promt
            })
    }

    logout(): void {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    
    isAuth(): boolean {
        return this.isAuthenticated;
    }

    private authSuccessRedirectTo(route: string): void {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/', route]);
    }
}