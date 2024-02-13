import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_API_FILM } from 'src/environments/environments';
import { Root } from '../interfaces/peliculas.interfaces';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private urlFilm: string = URL_API_FILM;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  getFilmByName(name: string): Observable<Root | undefined> {

    return this.http.get<Root>(`${this.urlFilm}${name}&include_adult=false&language=es-ES&page=1`, { headers: this.sharedService.headersFilm })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of(undefined);
        })
      );
  }
}