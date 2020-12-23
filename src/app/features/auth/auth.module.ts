import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../../material.module';

import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        SingupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    exports: [
        SingupComponent,
        LoginComponent
    ]
})
export class AuthModule {}