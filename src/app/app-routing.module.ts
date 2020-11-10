import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { TrainingComponent } from './components/training/training.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: SingupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'training', component: TrainingComponent },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule] 
})
export class AppRoutingModule { }
