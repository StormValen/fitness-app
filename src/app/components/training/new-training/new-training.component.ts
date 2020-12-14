import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { Exercise } from '../../../models/exercise.model';

import { TrainingService } from '../../../services/training.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    newTrainingForm: FormGroup;
    availableExercises: Exercise[];
    private availableExercisesSubscription: Subscription;

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.createNewTrainingForm();
        this.availableExercisesSubscription = this.trainingService.availableExercisesChange
            .subscribe((availableExercises: Exercise[]) => {
                this.availableExercises = availableExercises;
            });
        this.trainingService.fetchAvailableExercises();
    }

    onSubmit() {
        this.trainingService.startExercise(this.newTrainingForm.controls.exercise.value);
    }

    private createNewTrainingForm(): void {
        this.newTrainingForm = new FormGroup({
            exercise: new FormControl(
                '',
                { validators: [
                    Validators.required
                ]}
            )
        })
    }

    ngOnDestroy(): void {
        this.availableExercisesSubscription.unsubscribe();
    }
    
}
