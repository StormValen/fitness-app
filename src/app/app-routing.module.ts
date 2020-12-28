import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './features/auth/guards/auth.guard';

import { WelcomeComponent } from './core/welcome/welcome.component';
import { AuthRoutingModule } from './features/auth/auth-routing.module';

const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    {
      path: 'training',
      loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule)
    },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
