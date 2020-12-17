import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';

import { Exercise } from "../models/exercise.model";

@Injectable()
export class TrainingService {
    ongoingExerciseChange = new Subject<Exercise>();
    passedExercisesChange = new Subject<Exercise[]>();
    availableExercisesChange = new Subject<Exercise[]>();
    private ongoingExercise: Exercise;
    private availableExercises: Exercise[] = [];
    private fbSubscriptions: Subscription[] = [];

    constructor(private db: AngularFirestore) {}

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
        this.fbSubscriptions.push(this.db.collection('availableExercises')
            .snapshotChanges()
            .map(firestoreDocArray => {
                return firestoreDocArray.map((firestoreDoc: any) => { // FIXME: type 'any' is not a good practice.
                    return {
                        id: firestoreDoc.payload.doc.id,
                        ...firestoreDoc.payload.doc.data()
                    }
                })
            })
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.availableExercisesChange.next(this.availableExercises.slice());
            }));
    }

    fetchPassedExercises(): void {
        this.fbSubscriptions.push(this.db.collection('passedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.passedExercisesChange.next(exercises);
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