import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { TrainingComponent } from './components/training/training.component';
import { NewTrainingComponent } from './components/training/new-training/new-training.component';
import { PastTrainingComponent } from './components/training/past-training/past-training.component';
import { CurrentTrainingComponent } from './components/training/current-training/current-training.component';
import { StopTrainingComponent } from './components/training/current-training/stop-training/stop-training.component';

import { AuthService } from './services/auth.service';
import { TrainingService } from './services/training.service';

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        SingupComponent,
        LoginComponent,
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent,
        StopTrainingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAnalyticsModule,
    ],
    providers: [
        AuthService,
        TrainingService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        StopTrainingComponent
    ]
})
export class AppModule { }
