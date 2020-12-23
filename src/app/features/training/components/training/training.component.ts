import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from '../../services/training.service';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
    ongoingTraining: boolean = false;
    private ongoingTrainingSubscription: Subscription;

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.ongoingTrainingSubscription = this.trainingService.ongoingExerciseChange
            .subscribe(exercise => {
                if (exercise) {
                    this.ongoingTraining = true;
                } else {
                    this.ongoingTraining = false;
                }
            })
    }

    ngOnDestroy(): void {
        this.ongoingTrainingSubscription.unsubscribe();
    }

}
