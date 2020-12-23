import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './features/auth/guards/auth.guard';

import { WelcomeComponent } from './core/welcome/welcome.component';
import { SingupComponent } from './features/auth/components/singup/singup.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { TrainingComponent } from './features/training/components/training/training.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SingupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard] 
})
export class AppRoutingModule { }
