import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TrainingService } from '../../../services/training.service';
import { Exercise } from '../../../models/exercise.model';

import * as fromRoot from '../../../../../app.reducer';
import * as fromTraining from '../../../store/training.reducer';


@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
    newTrainingForm: FormGroup;
    isLoading$: Observable<boolean>;
    availableExercises$: Observable<Exercise[]>;

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromTraining.State>
    ) { }

    ngOnInit(): void {
        this.createNewTrainingForm();
        
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.availableExercises$ = this.store.select(fromTraining.getAvailableExercises);
        
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

}
