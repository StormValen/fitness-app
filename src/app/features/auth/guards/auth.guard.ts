import { Injectable } from '@angular/core';
import { Route, Router, CanLoad, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../../../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}

    // The canActivate method can return a boolean or and observable that returns a boolean
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}
