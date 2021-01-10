import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../../../services/training.service';

import * as fromTraining from '../../../store/training.reducer';

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
        private trainingService: TrainingService,
        private store: Store<fromTraining.State>
    ) { }

    ngOnInit(): void {
        this.startTraining();
    }

    startTraining(): void {
        this.store.select(fromTraining.getOngoingExercise)
            .pipe(take(1))
            .subscribe(ex => {
                const intervalStepDuration = ex.duration * 1000 / 100;
                this.progressInterval = setInterval(() => {
                    this.progressValue++;
                    if (this.progressValue >= 100)
                        this.progressFinished();
                }, intervalStepDuration);
            });
        
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
