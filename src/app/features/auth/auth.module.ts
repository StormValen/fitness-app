import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SharedModule } from '../../shared/shared.module';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule
    ],
    exports: [
        SignupComponent,
        LoginComponent
    ]
})
export class AuthModule {}
