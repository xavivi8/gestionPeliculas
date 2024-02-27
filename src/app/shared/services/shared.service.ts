import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponse } from 'src/app/auth/interfaces/usuario.interfaces';
import { URL_API } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class SharedService {

  private bearer_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWExOTJlMDRhMmUxNjQxY2UwM2Q3YmIwZjM0MmQyYSIsInN1YiI6IjY1YzNhOWFlY2ZmZWVkMDE2MzUxNzIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZczhan4Mfx7xuuQVTaB0TWdQaI0E4Hsd-CnslPQWYg";
  headersFilm: HttpHeaders;
  headersSge: HttpHeaders;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.headersFilm = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearer_token}`
    });
    this.headersSge = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  doLogout() {
    const body = new FormData();
    const usuario = localStorage.getItem('usuario');
    body.append('user', usuario as string);
    this.cookieService.deleteAll();
    localStorage.clear();
    return this.http.post(`${URL_API}/logout.php`, body);
  }

  public async isLoged(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=inicio`, { headers: this.headersSge })
        .subscribe((response: ApiResponse) => {
          console.log(response)
          resolve(response.ok);
        });
    });
    return promise;
  }

  public async isAuthenticated(url: string): Promise<boolean> {
    let rutaSeleccionada: string;
    const promise = new Promise<boolean>((resolve, reject) => {

      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];

      this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=${rutaSeleccionada}`, { headers: this.headersSge })
        .subscribe((response: ApiResponse) => {
          console.log(response)
          resolve(response.ok);
        });
    });
    return promise;
  }
}
