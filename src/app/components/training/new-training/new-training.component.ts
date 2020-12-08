import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Exercise } from 'src/app/models/exercise.model';

import { TrainingService } from '../../../services/training.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
    availableExercises: Exercise[] = [];
    newTrainingForm: FormGroup;

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.availableExercises = this.trainingService.getAvailableExercises();
        this.createNewTrainingForm();
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
}
