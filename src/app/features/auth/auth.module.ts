import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SharedModule } from '../../shared/shared.module';

import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        SingupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule
    ],
    exports: [
        SingupComponent,
        LoginComponent
    ]
})
export class AuthModule {}
