import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { TrainingService } from '../../training/services/training.service';
import { UIService } from '../../../shared/services/ui.service';
import { AuthData } from '../models/auth-data.model';

import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/services/ui.actions';
import * as Auth from '../../auth/store/auth.actions';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) { }

    initAuthListener(): void {
        this.auth.authState
            .subscribe(user => {
                if (user) {
                    this.store.dispatch(new Auth.SetAuthenticated());
                    this.router.navigate(['/']);
                } else {
                    this.store.dispatch(new Auth.SetUnauthenticated());
                    this.router.navigate(['/login']);
                    this.trainingService.cancelSubscriptions();
                }
            })
    }

    signup(authData: AuthData): void {
        this.store.dispatch(new UI.StartLoading());
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar('Sign in successfull!', null, 1);
            })
            .catch((err) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(err.message, 'Dismiss');
            })
    }

    login(authData: AuthData): void {
        this.store.dispatch(new UI.StartLoading());
        this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((response) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar('Log in successfull!', null, 1);
            })
            .catch((err) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(err.message, 'Dismiss');
            })
    }

    logout(): void {
        this.auth.signOut();
    }
}