import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TrainingService } from '../../../services/training.service';
import { Exercise } from '../../../models/exercise.model';

import * as fromRoot from '../../../../../app.reducer';
import * as fromTraining from '../../../store/training.reducer';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading$: Observable<boolean>;
    dataSource = new MatTableDataSource<Exercise>();
    displayedColumns: string[] = [
        'name',
        'duration',
        'calories',
        'date',
        'state'
    ];

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromTraining.State>
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);

        this.store.select(fromTraining.getPassedExercises)
            .subscribe((exercises: Exercise[]) => {
                this.dataSource.data = exercises;
            });

        this.trainingService.fetchPassedExercises();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filter: string): void {
        this.dataSource.filter = filter.trim().toLowerCase();
    }

}
