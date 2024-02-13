import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_API_FILM } from 'src/environments/environments';
import { Pelicula, Resultado } from '../interfaces/peliculas.interfaces';
import { SharedService } from '../../shared/services/shared.service';
import { ResultadoID } from '../interfaces/peliculas-id.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private peliculaSeleccionada: Pelicula | null = null;
  private urlFilm: string = URL_API_FILM;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  setPeliculaSeleccionada(pelicula: Pelicula) {
    this.peliculaSeleccionada = pelicula;
  }

  getPeliculaSeleccionada(): Pelicula | null {
    return this.peliculaSeleccionada;
  }

  getFilmByName(name: string): Observable<Resultado | undefined> {

    return this.http.get<Resultado>(`${this.urlFilm}search/movie?query=${name}&include_adult=false&language=es-ES&page=1`, { headers: this.sharedService.headersFilm })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of(undefined);
        })
      );
  }

  getFilmById(id: number): Observable<ResultadoID | undefined>{
    return this.http.get<ResultadoID>(`${this.urlFilm}movie/${id}`, { headers: this.sharedService.headersFilm }).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of(undefined);

      })
    )
  }
}
