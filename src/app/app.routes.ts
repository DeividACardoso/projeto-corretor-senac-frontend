import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./cliente-list/cliente-list.component')
    },

    {
        path: 'new',
        loadComponent: () => import('./cliente-form/cliente-form.component')
    },

    {
        path: ':id/edit',
        loadComponent: () => import('./cliente-form/cliente-form.component')
    }
]

