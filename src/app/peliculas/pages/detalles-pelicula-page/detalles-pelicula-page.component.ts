import { Component } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';

@Component({
  selector: 'app-detalles-pelicula-page',
  templateUrl: './detalles-pelicula-page.component.html',
  styles: [
  ]
})
export class DetallesPeliculaPageComponent {
  public pelicula: Pelicula | undefined;

  constructor() {
    // Definir valores predefinidos para la película
    this.pelicula = {
      adult: false,
      backdrop_path: '/ejemplo_backdrop_path.jpg',
      genre_ids: [1, 2],
      id: 123,
      original_language: 'en',
      original_title: 'Ejemplo de Película',
      overview: 'Esta es una película de ejemplo.',
      popularity: 7.8,
      poster_path: '/ejemplo_poster_path.jpg',
      release_date: '2023-01-01',
      title: 'Ejemplo de Película',
      video: false,
      vote_average: 8.5,
      vote_count: 100
    };
  }
}
