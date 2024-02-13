import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FavPageComponent } from './pages/fav-page/fav-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetallesPeliculaPageComponent } from './pages/detalles-pelicula-page/detalles-pelicula-page.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'fav', component: FavPageComponent },
      { path: 'datalles', component: DetallesPeliculaPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
