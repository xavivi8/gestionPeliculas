import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_API, URL_API_FILM } from 'src/environments/environments';
import { Pelicula, Resultado } from '../interfaces/peliculas.interfaces';
import { SharedService } from '../../shared/services/shared.service';
import { ResultadoID } from '../interfaces/peliculas-id.interfaces';
import { PeliFav } from '../interfaces/peliculas-fav.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
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

    return this.http.get<Resultado>(`${URL_API_FILM}search/movie?query=${name}&language=es-ES&page=1`, { headers: this.sharedService.headersFilm })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of(undefined);
        })
      );
  }

  getFilmById(id: number): Observable<ResultadoID | undefined>{
    return this.http.get<ResultadoID>(`${URL_API_FILM}movie/${id}`, { headers: this.sharedService.headersFilm }).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of(undefined);

      })
    )
  }

  /* Peliculas Favoritas */

  getPeliculasFavoritas(usuario: string): Observable<PeliFav[]> {
    return this.http.get<PeliFav[]>(`${URL_API}/peli_fav.php?usuario=${usuario}`, { headers: this.sharedService.headersSge}).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of([]);

      })
    );
  }

  agregarPeliFav(usuario: string, identificador: number): Observable<boolean> {
    const data = { usuario, identificador };
    return this.http.post<any>(`${URL_API}/peli_fav.php`, data).pipe(
      map(response => response.status === true),
      catchError(() => of(false))
    );
  }

  eliminarPeliFav(usuario: string, identificador: number): Observable<boolean> {
    return this.http.delete<any>(`${URL_API}/peli_fav.php?usuario=${usuario}&identificador=${identificador}`).pipe(
      map(response => response.status === true),
      catchError(() => of(false))
    );
  }
}
