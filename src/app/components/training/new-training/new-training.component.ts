import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Exercise } from 'src/app/models/exercise.model';

import { TrainingService } from '../../../services/training.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
    @Output() trainingStarted = new EventEmitter<void>();
    availableExercises: Exercise[] = [];

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.availableExercises = this.trainingService.getAvailableExercises();
    }

    onClickStartTraining(): void {
        this.trainingStarted.emit();
    }

}
