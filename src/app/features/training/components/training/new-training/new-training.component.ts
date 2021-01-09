import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '../../../services/training.service';

import { Exercise } from '../../../models/exercise.model';

import * as fromRoot from '../../../../../app.reducer';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    newTrainingForm: FormGroup;
    isLoading$: Observable<boolean>;
    availableExercises: Exercise[];
    private availableExercisesSubs: Subscription;

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.createNewTrainingForm();

        this.isLoading$ = this.store.select(fromRoot.getIsLoading);

        this.availableExercisesSubs = this.trainingService.availableExercisesChange
            .subscribe((availableExercises: Exercise[]) => {
                this.availableExercises = availableExercises;
            });

        this.fetchAvailableExercises();
    }

    onSubmit() {
        this.trainingService.startExercise(this.newTrainingForm.controls.exercise.value);
    }

    fetchAvailableExercises(): void {
        this.trainingService.fetchAvailableExercises();
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
        if (this.availableExercisesSubs) {
          this.availableExercisesSubs.unsubscribe();
        }
    }

}
