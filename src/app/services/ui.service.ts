import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
    loadingLogin = new Subject<boolean>();
    loadingSignup = new Subject<boolean>();
    loadingExercisesType = new Subject<boolean>();
    loadginPassedExercises = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) {}

    showSnackBar(message: string, action: string, duration?: number): void {
        let config = { duration: duration * 1000};
        this.snackBar.open(message, action, config);
    }
}