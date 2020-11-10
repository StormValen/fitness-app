//#region Libs
import { NgModule } from '@angular/core';
//#endregion
//#region Modules
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//#endregion
//#region Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { TrainingComponent } from './components/training/training.component';
import { NewTrainingComponent } from './components/training/new-training/new-training.component';
import { PastTrainingComponent } from './components/training/past-training/past-training.component';
import { CurrentTrainingComponent } from './components/training/current-training/current-training.component';
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
