import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { URL_API } from 'src/environments/environments';
import { ApiResponse } from '../interfaces/api-response';

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

  /**
   * Método para obtener los encabezados HTTP.
   * @returns {HttpHeaders} Encabezados HTTP con el token de autenticación almacenado en el local storage.
   */
  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  /**
   * Función para realizar la acción de cierre de sesión.
   * Elimina todas las cookies y limpia el local storage antes de realizar la solicitud de logout.
   * @returns {Observable} Observable para la solicitud de logout.
   */
  doLogout() {
    const body = new FormData();
    const usuario = localStorage.getItem('usuario');
    body.append('user', usuario as string);
    this.cookieService.deleteAll();
    localStorage.clear();
    location.reload();
    return this.http.post(`${URL_API}/logout.php`, body);
  }

  /**
   * Función asincrónica para verificar si el usuario está logueado.
   * Utiliza una solicitud HTTP para comprobar la autenticación del usuario.
   * @returns {Promise<boolean>} Promise que resuelve a un booleano indicando si el usuario está logueado o no.
   */
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

  /**
   * Función asincrónica para verificar si el usuario está autenticado para acceder a una ruta específica.
   * Utiliza una solicitud HTTP para comprobar la autenticación del usuario basada en la URL proporcionada.
   * @param {string} url URL de la ruta para la cual se verifica la autenticación.
   * @returns {Promise<boolean>} Promise que resuelve a un booleano indicando si el usuario está autenticado o no para acceder a la ruta.
   */
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
