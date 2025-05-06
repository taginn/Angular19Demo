import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'items',
    loadComponent: () =>
      import('./features/items/items-list.component').then(
        (m) => m.ItemsListComponent
      ),
  },
];
