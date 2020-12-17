import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "../models/auth-data.model";

import { TrainingService } from './training.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService
    ) { }

    initAuthListener(): void {
        this.auth.authState
            .subscribe(user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                    this.router.navigate(['/welcome']);
                } else {
                    this.isAuthenticated = false;
                    this.authChange.next(false);
                    this.router.navigate(['/login']);
                    this.trainingService.cancelSubscriptions();
                }
            })
    }

    signup(authData: AuthData): void {
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                // TODO: show a success promt.
            })
            .catch((err) => {
                // TODO: show up an error promt.
            })
    }

    login(authData: AuthData): void {
        this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                // TODO: show a success promt.
            })
            .catch((err) => {
                // TODO: show up an error promt.
            })
    }

    logout(): void {
        this.auth.signOut();
    }

    
    isAuth(): boolean {
        return this.isAuthenticated;
    }
}