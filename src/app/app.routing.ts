import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/auth';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'profile', component: HomeComponent, canActivate: [ AuthGuard ]}, // Only logged users example

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);