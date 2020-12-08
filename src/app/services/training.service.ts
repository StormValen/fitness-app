import { Subject } from 'rxjs';

import { Exercise } from "../models/exercise.model";

export class TrainingService {
    ongoingExerciseChange = new Subject<Exercise>();
    private ongoingExercise: Exercise;
    private passedExercises: Exercise[] = [];
    private availableExercises: Exercise[] = [
        { 
            id: 'crunches', 
            name: 'Crunches', 
            duration: 30, 
            calories: 8 
        },
        { 
            id: 'touch-toes', 
            name: 'Touch Toes', 
            duration: 180, 
            calories: 15 
        },
        { 
            id: 'side-lunges', 
            name: 'Side Lunges', 
            duration: 120, 
            calories: 18 
        },
        { 
            id: 'burpees', 
            name: 'Burpees', 
            duration: 60, 
            calories: 8 
        }
    ]

    startExercise(selectedExerciseId): void {
        this.ongoingExercise = this.availableExercises.find(
            exercise => exercise.id === selectedExerciseId
        )
        this.ongoingExerciseChange.next({ ...this.ongoingExercise });
    }

    completeExercise(): void {
        this.passedExercises
            .push({
                ...this.ongoingExercise,
                date: new Date(),
                state: 'completed'
            });
        this.ongoingExercise = null;
        this.ongoingExerciseChange.next(null);
    }

    cancelExercise(progress: number): void {
        this.passedExercises
            .push({
                ...this.ongoingExercise,
                duration: this.ongoingExercise.duration * (progress / 100),
                calories: this.ongoingExercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
        this.ongoingExercise = null;
        this.ongoingExerciseChange.next(null);
    }

    getAvailableExercises(): Exercise[] {
        console.log('passes exercises ', this.passedExercises);
        return this.availableExercises.slice();
    }

    getOngoingExercise(): Exercise {
        return { ...this.ongoingExercise };
    }
}