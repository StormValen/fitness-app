import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {

    constructor(private snackBar: MatSnackBar) {}

    showSnackBar(message: string, action: string, duration?: number): void {
        this.snackBar.open(message, action, {
          duration: duration * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
    }
}
