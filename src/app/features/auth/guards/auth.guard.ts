import { Injectable } from '@angular/core';
import {
  Route,
  Router,
  CanLoad,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route) {
      if (this.authService.isAuth()) {
        return true;
      } else {
          this.router.navigate(['/login']);
      }
    }
}
