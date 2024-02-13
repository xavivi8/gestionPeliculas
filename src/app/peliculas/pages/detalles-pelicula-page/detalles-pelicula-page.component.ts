import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';
import { PeliculaService } from '../../services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';

@Component({
  selector: 'app-detalles-pelicula-page',
  templateUrl: './detalles-pelicula-page.component.html',
  styles: [
  ]
})
export class DetallesPeliculaPageComponent implements OnInit {
  public pelicula: ResultadoID | undefined | null;

  constructor(
    private peliculasService: PeliculaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
    // Definir valores predefinidos para la película

  }
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
