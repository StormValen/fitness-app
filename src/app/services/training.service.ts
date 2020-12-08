import { Subject } from 'rxjs';

import { Exercise } from "../models/exercise.model";

export class TrainingService {
    ongoingExerciseChange = new Subject<Exercise>();
    private ongoingExercise: Exercise;
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
        this.emitOngoingExercise();
    }

    getAvailableExercises(): Exercise[] {
        return this.availableExercises.slice();
    }

    private emitOngoingExercise(): void {
        this.ongoingExerciseChange.next(this.ongoingExercise);
    }
}