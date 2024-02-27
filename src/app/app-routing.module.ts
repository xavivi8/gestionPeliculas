import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { NoLoginGuard } from './shared/guards/no-auth.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermiseGuard } from './shared/guards/permise.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    //canActivate: [NoLoginGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then( m => m.PeliculasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then( m => m.UserManagementModule),
    canActivate: [PermiseGuard]
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
