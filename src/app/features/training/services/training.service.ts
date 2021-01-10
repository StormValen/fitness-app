import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { UIService } from '../../../shared/services/ui.service';

import { Exercise } from "../models/exercise.model";

import * as fromTraining from '../store/training.reducer';
import * as UI from '../../../shared/services/ui.actions';
import * as Training from '../store/training.actions';

@Injectable()
export class TrainingService {
    private fbSubscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {}

    startExercise(selectedExerciseId): void {
        this.store.dispatch(new Training.StartTraining(selectedExerciseId));
    }

    completeExercise(): void {
        this.store.select(fromTraining.getOngoingExercise)
            .pipe(take(1))
            .subscribe(ex => {
                this.store.dispatch(new Training.StopTraining());
                this.addPassedExerciseToDatabase({
                        ...ex,
                        date: new Date(),
                        state: 'completed'
                    });
            })
    }

    cancelExercise(progress: number): void {
        this.store.select(fromTraining.getOngoingExercise)
            .pipe(take(1))
            .subscribe(ex => {
                this.store.dispatch(new Training.StopTraining());
                this.addPassedExerciseToDatabase({
                        ...ex,
                        duration: ex.duration * (progress / 100),
                        calories: ex.calories * (progress / 100),
                        date: new Date(),
                        state: 'cancelled'
                    });
            })
    }

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubscriptions.push(this.db.collection('availableExercises')
            .snapshotChanges()
            .map(firestoreDocArray => {
                return firestoreDocArray.map((firestoreDoc: any) => {
                    return {
                        id: firestoreDoc.payload.doc.id,
                        ...firestoreDoc.payload.doc.data()
                    }
                });
            })
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));
                this.store.dispatch(new UI.StopLoading());
            }, err => {
                this.uiService.showSnackBar('Error when fetching data', null);
                this.store.dispatch(new UI.StopLoading());
            }));
    }

    fetchPassedExercises(): void {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubscriptions.push(this.db.collection('passedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
                this.store.dispatch(new UI.StopLoading());
            }));
    }

    cancelSubscriptions(): void {
        this.fbSubscriptions.forEach(sub => sub.unsubscribe());
    }

    private addPassedExerciseToDatabase(exercise: Exercise) {
        this.db.collection('passedExercises').add(exercise);
    }
}