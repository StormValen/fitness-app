import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/features/auth/services/auth.service';

import * as fromRoot from '../../../app.reducer';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
    @Output() toggleSidenav = new EventEmitter<void>();
    isAuth$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }

    onClickSidenavItem(): void {
        this.toggleSidenav.emit();
    }

    onClickLogout(): void {
        this.authService.logout();
        this.onClickSidenavItem();
    }

}
