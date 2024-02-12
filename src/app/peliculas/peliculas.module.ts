import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { MaterialModule } from '../material/material.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FavPageComponent } from './pages/fav-page/fav-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [
    SearchPageComponent,
    FavPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PeliculasModule { }
