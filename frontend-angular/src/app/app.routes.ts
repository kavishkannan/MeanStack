import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
    ...authRoutes,
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./home/home').then(m => m.Home)
    },
    {
        path: 'about',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./about/about').then(m => m.About)
    },
    {
        path: 'books',
        canActivate: [authGuard],
        loadComponent: () => import('./books/books-dashboard/books-dashboard').then(m => m.BooksDashboard)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // Wildcard catch-all
    { path: '**', redirectTo: 'dashboard' }
];
