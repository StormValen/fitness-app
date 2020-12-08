import { Component, OnInit } from '@angular/core';

import { TrainingService } from '../../services/training.service';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
    ongoingTraining: boolean = false;

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.trainingService.ongoingExerciseChange
            .subscribe(exercise => {
                if (exercise !== null) {
                    this.ongoingTraining = true;
                }
            })
    }

}
