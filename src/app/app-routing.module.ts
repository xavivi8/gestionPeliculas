import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { cantActivateGuard, cantMatchGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canMatch: [cantMatchGuard], //Anclamos la función del canMatch
    canActivate: [cantActivateGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule),
    canActivate: [canMatchGuard],
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then( m => m.PeliculasModule),
    canMatch: [canMatchGuard], //Anclamos la función del canMatch
    canActivate: [canActivateGuard]
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then( m => m.UserManagementModule),
    canActivate: [canMatchGuard]
  },
  { path: '404', component: Error404PageComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
