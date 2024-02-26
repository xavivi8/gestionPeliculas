import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { URL_API, URL_API_FILM } from 'src/environments/environments';
import { Pelicula, Resultado } from '../interfaces/peliculas.interfaces';
import { ResultadoPeliFav } from '../interfaces/peliculas-fav.interfaces';
import { SharedService } from '../../shared/services/shared.service';
import { ResultadoID } from '../interfaces/peliculas-id.interfaces';
import { PeliFav } from '../interfaces/peliculas-fav.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private peliculaSeleccionada!: Pelicula | ResultadoID;
  private urlFilm: string = URL_API_FILM;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  setPeliculaSeleccionada(pelicula: Pelicula | ResultadoID) {
    this.peliculaSeleccionada = pelicula;
  }

  getPeliculaSeleccionada(): Pelicula | ResultadoID {
    return this.peliculaSeleccionada;
  }

  getFilmByName(name: string): Observable<Resultado | undefined> {

    return this.http.get<Resultado>(`${URL_API_FILM}search/movie?query=${name}&language=es-ES&page=1`, { headers: this.sharedService.headersFilm })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of(undefined);
        })
      );
  }

  getFilmById(id: number): Observable<ResultadoID>{
    return this.http.get<ResultadoID>(`${URL_API_FILM}movie/${id}`, { headers: this.sharedService.headersFilm }).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of();

      })
    )
  }

  /* Peliculas Favoritas */

  getPeliculasFavoritas(usuario: string): Observable<ResultadoPeliFav> {
    return this.http.get<ResultadoPeliFav>(`${URL_API}/peli_fav.php?usuario=${usuario}`, { headers: this.sharedService.headersSge}).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of();

      })
    );
  }

  agregarPeliFav(usuario: string, identificador: number): Observable<boolean> {
    const DATA = { usuario, identificador };
    const HEADERS = { headers: this.sharedService.headersSge};
    return this.http.post<any>(`${URL_API}/peli_fav.php`, DATA, HEADERS).pipe(
      map(response => response.status === true),
      catchError(() => of(false))
    );
  }

  eliminarPeliFav(usuario: string, identificador: number): Observable<boolean> {

    const DATA = { usuario, identificador };
    const HEADERS = { headers: this.sharedService.headersSge, body: DATA };
    return this.http.post<any>(`${URL_API}/peli_fav.php`, null, HEADERS).pipe(
      map(response => response.status === true),
      catchError(() => of(false))
    );
  }
}
