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
/**
 * Servicio para la gestión de películas.
 */
export class PeliculasService {
  private peliculaSeleccionada!: Pelicula | ResultadoID;
  private urlFilm: string = URL_API_FILM;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  /**
   * Establece la película seleccionada.
   * @param {Pelicula | ResultadoID} pelicula La película seleccionada.
   * @returns {void}
   */
  setPeliculaSeleccionada(pelicula: Pelicula | ResultadoID) {
    this.peliculaSeleccionada = pelicula;
  }

  /**
   * Obtiene la película seleccionada.
   * @returns {Pelicula | ResultadoID} La película seleccionada.
   */
  getPeliculaSeleccionada(): Pelicula | ResultadoID {
    return this.peliculaSeleccionada;
  }

  /**
   * Obtiene películas por nombre.
   * @param {string} name El nombre de la película a buscar.
   * @returns {Observable<Resultado | undefined>} Un Observable con el resultado de la búsqueda de películas.
   */
  getFilmByName(name: string): Observable<Resultado | undefined> {

    return this.http.get<Resultado>(`${URL_API_FILM}search/movie?query=${name}&language=es-ES&page=1`, { headers: this.sharedService.headersFilm })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of(undefined);
        })
      );
  }

  /**
   * Obtiene una película por su ID.
   * @param {number} id El ID de la película a buscar.
   * @returns {Observable<ResultadoID>} Un Observable con la película encontrada.
   */
  getFilmById(id: number): Observable<ResultadoID>{
    return this.http.get<ResultadoID>(`${URL_API_FILM}movie/${id}`, { headers: this.sharedService.headersFilm }).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of();

      })
    )
  }

  /* Peliculas Favoritas */
  /**
   * Obtiene las películas favoritas de un usuario.
   * @param {string} usuario El nombre de usuario para el cual se buscan las películas favoritas.
   * @returns {Observable<ResultadoPeliFav>} Un Observable con el resultado de la búsqueda de las películas favoritas.
   */
  getPeliculasFavoritas(usuario: string): Observable<ResultadoPeliFav> {
    return this.http.get<ResultadoPeliFav>(`${URL_API}/peli_fav.php?usuario=${usuario}`, { headers: this.sharedService.headersSge}).pipe(
      catchError(error => {
        console.log('Error: ',error);
        return of();

      })
    );
  }

  /**
   * Agrega una película a la lista de películas favoritas de un usuario.
   * @param {string} usuario El nombre de usuario al que se agrega la película favorita.
   * @param {number} identificador El identificador de la película a agregar como favorita.
   * @returns {Observable<boolean>} Un Observable que indica si la operación fue exitosa.
   */
  agregarPeliFav(usuario: string, identificador: number): Observable<boolean> {
    const DATA = { usuario, identificador };
    const HEADERS = { headers: this.sharedService.headersSge};
    return this.http.post<any>(`${URL_API}/peli_fav.php`, DATA, HEADERS).pipe(
      map(response => response.status === true),
      catchError(() => of(false))
    );
  }

  /**
   * Elimina una película de la lista de películas favoritas de un usuario.
   * @param {string} usuario El nombre de usuario del que se elimina la película favorita.
   * @param {number} identificador El identificador de la película a eliminar de las favoritas.
   * @returns {Observable<boolean>} Un Observable que indica si la operación fue exitosa.
   */
  eliminarPeliFav(usuario: string, identificador: number): Observable<boolean> {
    const DATA = { usuario, identificador };
    const OPTIONS = { headers: this.sharedService.headersSge, body: DATA };

    return this.http.delete<any>(`${URL_API}/peli_fav.php`, OPTIONS).pipe(
      map(response => response.status === true),
      catchError(() => of(false))
    );
  }
}
