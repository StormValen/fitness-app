import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { TrainingService } from '../../../services/training.service';

import { Exercise } from '../../../models/exercise.model';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    passedExercisesSubscription: Subscription;
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
        this.passedExercisesSubscription = this.trainingService.passedExercisesChange
            .subscribe((exercises: Exercise[]) => {
                this.dataSource.data = exercises;
            })
        this.trainingService.fetchPassedExercises();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    } 
    
    doFilter(filter: string): void {
        this.dataSource.filter = filter.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.passedExercisesSubscription.unsubscribe();
    }

}
