import { Action } from '@ngrx/store';

/**
 * NgRx Convention
 * [ reducer's name ] + action name
 */
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';


/**
 * Export the Actions as classes to get autocompletion support
 */
export class StartLoading implements Action {
    readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

/**
 * Export the types to only could be these 2 classes
 */
export type UIAction = StartLoading | StopLoading;