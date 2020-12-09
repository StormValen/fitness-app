import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { TrainingService } from '../../../services/training.service';

import { Exercise } from '../../../models/exercise.model';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource<Exercise>();
    displayedColumns: string[] = [
        'name',
        'duration',
        'calories',
        'date',
        'state'
    ];

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.dataSource.data = this.trainingService.getPassedExercises();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }    

}
