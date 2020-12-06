import { 
    Component, 
    EventEmitter, 
    OnDestroy, 
    OnInit, 
    Output 
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() toggleSidenav = new EventEmitter<void>();
    isAuth: boolean = false;
    private authSusbcription: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authSusbcription = this.authService.authChange
            .subscribe(authStatus => {
                this.isAuth = authStatus;
            })
    }

    onClickMenu(): void {
        this.toggleSidenav.emit();
    }

    onClickLogout(): void {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.authSusbcription.unsubscribe();
    }

}
