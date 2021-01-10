import { Action } from '@ngrx/store';

/**
 * NgRx Convention
 * [ reducer's name ] + action name
 */
export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';


/**
 * Export the Actions as classes to get autocompletion support
 */
export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

/**
 * Export the types to only could be these 2 classes
 */
export type AuthAction = SetAuthenticated | SetUnauthenticated;