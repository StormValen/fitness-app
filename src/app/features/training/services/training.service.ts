import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { UIService } from '../../../shared/services/ui.service';

import { Exercise } from "../models/exercise.model";

import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/services/ui.actions';

@Injectable()
export class TrainingService {
    ongoingExerciseChange = new Subject<Exercise>();
    passedExercisesChange = new Subject<Exercise[]>();
    availableExercisesChange = new Subject<Exercise[]>();
    private ongoingExercise: Exercise;
    private availableExercises: Exercise[] = [];
    private fbSubscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    startExercise(selectedExerciseId): void {
        this.ongoingExercise = this.availableExercises.find(
            exercise => exercise.id === selectedExerciseId
        )
        this.ongoingExerciseChange.next({ ...this.ongoingExercise });
    }

    completeExercise(): void {
        this.addPassedExerciseToDatabase({
                ...this.ongoingExercise,
                date: new Date(),
                state: 'completed'
            });
        this.ongoingExercise = null;
        this.ongoingExerciseChange.next(null);
    }

    cancelExercise(progress: number): void {
        this.addPassedExerciseToDatabase({
                ...this.ongoingExercise,
                duration: this.ongoingExercise.duration * (progress / 100),
                calories: this.ongoingExercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
        this.ongoingExercise = null;
        this.ongoingExerciseChange.next(null);
    }

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubscriptions.push(this.db.collection('availableExercises')
            .snapshotChanges()
            .map(firestoreDocArray => {
                return firestoreDocArray.map((firestoreDoc: any) => { // FIXME: type 'any' is not a good practice.
                    return {
                        id: firestoreDoc.payload.doc.id,
                        ...firestoreDoc.payload.doc.data()
                    }
                });
            })
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.availableExercisesChange.next(this.availableExercises.slice());
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
                this.passedExercisesChange.next(exercises);
                this.store.dispatch(new UI.StopLoading());
            }));
    }

    getOngoingExercise(): Exercise {
        return { ...this.ongoingExercise };
    }

    cancelSubscriptions(): void {
        this.fbSubscriptions.forEach(sub => sub.unsubscribe());
    }

    private addPassedExerciseToDatabase(exercise: Exercise) {
        this.db.collection('passedExercises').add(exercise);
    }
}