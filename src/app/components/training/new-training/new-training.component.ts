import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import { UIService } from 'src/app/services/ui.service';

import { Exercise } from '../../../models/exercise.model';

import { TrainingService } from '../../../services/training.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    newTrainingForm: FormGroup;
    loading: boolean = false;
    availableExercises: Exercise[];
    private subscriptions: Subscription[] = [];

    constructor(
        private trainingService: TrainingService,
        private uiService: UIService
    ) { }

    ngOnInit(): void {
        this.createNewTrainingForm();

        this.subscriptions.push(this.trainingService.availableExercisesChange
            .subscribe((availableExercises: Exercise[]) => {
                this.availableExercises = availableExercises;
            }));

        this.subscriptions.push(this.uiService.loadingExercisesType
            .subscribe(loading => {
                this.loading = loading;
            }))
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
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    
}
