import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { guestGuard } from '../core/guest-guard';

export const authRoutes: Routes = [
    {
        path: 'login', loadComponent: () =>
            import('./login/login').then(m => m.Login),
        canActivate: [guestGuard],

    },
    {
        path: 'register', loadComponent: () =>
            import('./register/register').then(m => m.Register),
        canActivate: [guestGuard],

    },
    // { path: '', redirectTo: 'login', pathMatch: 'full' }
];
