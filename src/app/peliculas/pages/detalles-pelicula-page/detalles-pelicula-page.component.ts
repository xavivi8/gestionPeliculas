import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';

@Component({
  selector: 'app-detalles-pelicula-page',
  templateUrl: './detalles-pelicula-page.component.html',
  styleUrls: ['./detalles-pelicula-page.component.css']
})
export class DetallesPeliculaPageComponent implements OnInit {
  public pelicula: ResultadoID | undefined | null;

  constructor(
    private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {}

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya inicializado todas las propiedades del componente.
   * Obtiene la película seleccionada para mostrar detalles basados en el ID de la película proporcionado en la ruta.
   * Navega a la página de búsqueda de películas si la película no se encuentra.
   * @returns {void}
   */
  ngOnInit(): void {
    /* this.pelicula = this.peliculasService.getPeliculaSeleccionada(); */
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.peliculasService.getFilmById(id))
    ).subscribe(peli => {
      if (!peli) return this.router.navigate(['/peliculas/search'])

      this.pelicula = peli
      console.log('Pelicula: ' + this.pelicula)
      console.log('Peli: ' + peli);
      return;
    })
  }
}
