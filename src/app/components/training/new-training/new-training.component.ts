import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Exercise } from '../../../models/exercise.model';

import { TrainingService } from '../../../services/training.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
    availableExercises: Observable<Exercise[]>;
    newTrainingForm: FormGroup;

    constructor(
        private trainingService: TrainingService,
        private db: AngularFirestore
    ) { }

    ngOnInit(): void {
        this.createNewTrainingForm();

        this.availableExercises = this.db.collection('availableExercises')
            .snapshotChanges()
            .map(firestoreDocArray => {
                return firestoreDocArray.map((firestoreDoc: any) => { // FIXME: type 'any' is not a good practise.
                    return {
                        id: firestoreDoc.payload.doc.id,
                        ...firestoreDoc.payload.doc.data()
                    }
                });
            });

        // TODO: delte from here and delete service method.
        // this.availableExercises = this.trainingService.getAvailableExercises();
    }

    onSubmit() {
        this.trainingService.startExercise(this.newTrainingForm.controls.exercise.value);
    }

    private createNewTrainingForm(): void {
        this.newTrainingForm = new FormGroup({
            exercise: new FormControl(
                '',
                { validators: [
                    Validators.required
                ]}
            )
        })
    }
}
