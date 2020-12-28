import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './features/auth/guards/auth.guard';

import { WelcomeComponent } from './core/welcome/welcome.component';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { TrainingRoutingModule } from './features/training/training-routing.module';

const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule,
        TrainingRoutingModule
    ],
    exports: [RouterModule],
    providers: [AuthGuard] 
})
export class AppRoutingModule { }
