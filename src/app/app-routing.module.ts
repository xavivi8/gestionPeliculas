import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'inicio',
    loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule),
    /* canMatch: [AuthGuard.canMatchGuard],
    canActivate: [AuthGuard.canActivateGuard] */
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then( m => m.PeliculasModule),
    /* canMatch: [AuthGuard.canMatchGuard],
    canActivate: [AuthGuard.canActivateGuard] */
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then( m => m.UserManagementModule),
    /* canMatch: [AuthGuard.canMatchGuard],
    canActivate: [AuthGuard.canActivateGuard] */
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
