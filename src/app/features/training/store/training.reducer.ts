import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TrainingAction, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from '../models/exercise.model';

import * as fromRoot from '../../../app.reducer';

/**
 * The training-module is lazy loaded
 * It cannot be injected in the RootState
 * Need to override the RootState when module is loaded.
 */
export interface TrainingState {
    ongoingExercise: Exercise;
    availableExercises: Exercise[];
    passedExercises: Exercise[];
}

/**
 * NgRx auto merges the app state with this module app state
 * when training module is lazy loaded. This is the new
 * Global State.
 */
export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    ongoingExercise: null,
    availableExercises: [],
    passedExercises: []
}

export function trainingReducer(state = initialState, action: TrainingAction) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: action.payload
            }
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                passedExercises: action.payload
            }
        case START_TRAINING:
            return {
                ...state,
                ongoingExercise: { ...state.availableExercises.find(ex => ex.id === action.payload) }
            }
        case STOP_TRAINING:
            return {
                ...state,
                ongoingExercise: null
            }
        default: 
            return state;
    }
}

/**
 * The training identifier has to match the state slice id
 * used in the module store's provider.
 */
export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getPassedExercises = createSelector(getTrainingState, (state: TrainingState) => state.passedExercises);
export const getOngoingExercise = createSelector(getTrainingState, (state: TrainingState) => state.ongoingExercise);