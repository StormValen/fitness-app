import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/services/ui.reducer';
import * as fromAuth from  './features/auth/store/auth.reducer';

// Aplication wide State
export interface State {
    ui: fromUI.State; // State slice. There could be more than 1
    auth: fromAuth.State;
}

// A reducer per aplication wide state
export const reducers: ActionReducerMap<State> = {
    // A reducer per each state slice
    ui: fromUI.uiReducer, 
    auth: fromAuth.authReducer
}

// This gives acces to the store's auth slice.
export const getUiState = createFeatureSelector<fromUI.State>('ui'); 
// This gives access to the slice's property.
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading); 

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth); 