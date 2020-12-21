import { Subject } from 'rxjs';

export class UIService {
    loadingLogin = new Subject<boolean>();
    loadingSignup = new Subject<boolean>();
    loadingExercisesType = new Subject<boolean>();
    loadginPassedExercises = new Subject<boolean>();
}