import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { MaterialModule } from '../material/material.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FavPageComponent } from './pages/fav-page/fav-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CardPeliculaComponent } from './components/card-pelicula/card-pelicula.component';
import { PeliculaImagePipe } from './pipe/pelicula-image.pipe';
import { FechaFormatoPipe } from './pipe/fecha-formato.pipe';
import { DetallesPeliculaPageComponent } from './pages/detalles-pelicula-page/detalles-pelicula-page.component';
import { CardPeliculaFavComponent } from './components/card-pelicula-fav/card-pelicula-fav.component';


@NgModule({
  declarations: [
    SearchPageComponent,
    FavPageComponent,
    HomePageComponent,
    CardPeliculaComponent,
    PeliculaImagePipe,
    FechaFormatoPipe,
    DetallesPeliculaPageComponent,
    CardPeliculaFavComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PeliculasModule { }
