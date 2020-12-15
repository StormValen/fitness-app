import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'Fitness App';

    constructor(private authService: AuthService) {}

    ngAfterViewInit() {
        this.authService.getSession();
    }
}
