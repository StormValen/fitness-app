import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './features/auth/auth.module';
// import { TrainingModule } from './features/training/training.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/navigation/header/header.component';
import { SidenavListComponent } from './core/navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './core/welcome/welcome.component';

import { UIService } from './shared/services/ui.service';
import { AuthService } from './features/auth/services/auth.service';
import { TrainingService } from './features/training/services/training.service';

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        AuthModule,
        // TrainingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAnalyticsModule,

    ],
    providers: [
        AuthService,
        TrainingService,
        UIService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
