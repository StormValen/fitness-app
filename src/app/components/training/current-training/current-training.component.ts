import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
    @Output() trainingExit = new EventEmitter<void>();
    progressValue: number = 0;
    progressCompleted: boolean = false;
    progressInterval;

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.startTraining();
    }

    startTraining(): void {
        this.progressInterval = setInterval(() => {
            this.progressValue++;
            if (this.progressValue >= 100)
                this.progressFinished();
        }, 100);
    }

    stopTraining(): void {
        clearInterval(this.progressInterval);

        const dialogRef = this.dialog.open(StopTrainingComponent, {
            data: {
                progressValue: this.progressValue
            }
        });

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.trainingExit.emit();
                } else {
                    this.startTraining();
                }
            })
    }

    private progressFinished(): void {
        clearInterval(this.progressInterval);
        this.progressCompleted = true;
    }

}
