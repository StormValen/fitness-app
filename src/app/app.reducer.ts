import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/services/ui.reducer';

// Aplication wide State
export interface State {
    ui: fromUI.State // State slice. There could be more than 1
}

// A reducer per aplication wide state
export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer // A reducer per each state slice
}

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);