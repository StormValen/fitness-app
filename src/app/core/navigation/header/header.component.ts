import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../../features/auth/services/auth.service';

import * as fromRoot from '../../../app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() toggleSidenav = new EventEmitter<void>();
    isAuth$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }

    onClickMenu(): void {
        this.toggleSidenav.emit();
    }

    onClickLogout(): void {
        this.authService.logout();
    }

}
