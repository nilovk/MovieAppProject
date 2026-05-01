import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'details/:id', // Dynamic route with parameter "id"
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'favourites', // Dynamic route with parameter "id"
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },
  {
    path: 'movie-details/:id', // Dynamic route with parameter "id"
    loadComponent: () => import('./movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
];
