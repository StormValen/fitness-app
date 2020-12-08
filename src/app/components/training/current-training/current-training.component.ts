import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/services/training.service';

import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
    progressValue: number = 0;
    progressCompleted: boolean = false;
    private progressInterval;

    constructor(
        private dialog: MatDialog,
        private trainingService: TrainingService
    ) { }

    ngOnInit(): void {
        this.startTraining();
    }

    startTraining(): void {
        const intervalStepDuration = this.trainingService.getOngoingExercise().duration * 1000 / 100;
        this.progressInterval = setInterval(() => {
            this.progressValue++;
            if (this.progressValue >= 100)
                this.progressFinished();
        }, intervalStepDuration);
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
                    this.trainingService.cancelExercise(this.progressValue);
                } else {
                    this.startTraining();
                }
            })
    }

    private progressFinished(): void {
        clearInterval(this.progressInterval);
        this.progressCompleted = true;
        this.trainingService.completeExercise();
    }

}
