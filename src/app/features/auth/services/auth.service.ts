import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { AuthData } from '../models/auth-data.model';

import { TrainingService } from '../../training/services/training.service';
import { UIService } from '../../../shared/services/ui.service';

import * as fromApp from '../../../app.reducer';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<{ui: fromApp.State}>
    ) { }

    initAuthListener(): void {
        this.auth.authState
            .subscribe(user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                    this.router.navigate(['/']);
                } else {
                    this.isAuthenticated = false;
                    this.authChange.next(false);
                    this.router.navigate(['/login']);
                    this.trainingService.cancelSubscriptions();
                }
            })
    }

    signup(authData: AuthData): void {
        this.store.dispatch({type: 'START_LOADING'});
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackBar('Sign in successfull!', null, 1);
            })
            .catch((err) => {
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackBar(err.message, 'Dismiss');
            })
    }

    login(authData: AuthData): void {
        this.store.dispatch({type: 'START_LOADING'});
        this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackBar('Log in successfull!', null, 1);
            })
            .catch((err) => {
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackBar(err.message, 'Dismiss');
            })
    }

    logout(): void {
        this.auth.signOut();
    }

    
    isAuth(): boolean {
        return this.isAuthenticated;
    }
}