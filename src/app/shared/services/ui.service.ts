import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
    // TODO: Deprecated.
    // loadingLogin = new Subject<boolean>();
    // loadingSignup = new Subject<boolean>();
    // loadingExercisesType = new Subject<boolean>();
    // loadginPassedExercises = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) {}

    showSnackBar(message: string, action: string, duration?: number): void {
        this.snackBar.open(message, action, {
          duration: duration * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
    }
}
