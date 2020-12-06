import { 
    Component, 
    EventEmitter, 
    OnDestroy, 
    OnInit, 
    Output 
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
    @Output() toggleSidenav = new EventEmitter<void>();
    isAuth: boolean = false;
    private authSubscription: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authSubscription = this.authService.authChange
            .subscribe(authStatus => {
                this.isAuth = authStatus;
            })
    }

    onClickSidenavItem(): void {
        this.toggleSidenav.emit();
    }

    onClickLogout(): void {
        this.authService.logout();
        this.onClickSidenavItem();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

}
