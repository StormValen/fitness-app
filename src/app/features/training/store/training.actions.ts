import { Action } from '@ngrx/store';

import { Exercise } from '../models/exercise.model';

/**
 * NgRx Convention
 * [ reducer's name ] + action name
 */
export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';


/**
 * Export the Actions as classes to get autocompletion support
 * The exercises set need to passed along with the action.
 */
export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;
    constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;
    constructor(public payload: Exercise) {}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
    constructor(public payload: Exercise) {}
}

/**
 * Export the types to only could be these 4 classes
 */
export type TrainingAction = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;