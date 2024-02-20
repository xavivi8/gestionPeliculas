import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, User } from '../interfaces/usuario.interfaces';
import { URL_API } from 'src/environments/environments';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  public user?: User;


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private commonService: SharedService
  ) { }

  doLogin(data: any) {

    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API}/login.php`, body);
  }

  /* ublic async isAuthenticated(url: string): Promise<boolean> {
    try {
      const rutaSeleccionada = url.substring(1).split('/')[0];
      const response = await this.http
        .get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=${rutaSeleccionada}`, { headers: this.commonService.getHeaders() })
        .toPromise();

      return response?.ok ?? true; // Si response.ok está definido, devuelve su valor; de lo contrario, devuelve false
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false; // Retorna false en caso de error
    }
  } */

  /* public async isAuthenticated(url: string): Promise<boolean> {

    let rutaSeleccionada: string;
    const promise = new Promise<boolean>((resolve, reject) => {
      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];
      this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=${ rutaSeleccionada }`,  { headers: this.commonService.getHeaders() } )
      .subscribe((response: ApiResponse) => {
      resolve(response.ok);
      });
    });

    return promise ?? false;
  } */
  public isAuthenticated(url: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let rutaSeleccionada: string;
      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];

      this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=${rutaSeleccionada}`, { headers: this.commonService.getHeaders() })
        .pipe(
          map((response: ApiResponse) => response.ok)
        )
        .subscribe({
          next: (result: boolean) => observer.next(result),
          error: (error: any) => observer.error(error),
          complete: () => observer.complete()
        });
    });
  }

  checkAuthentication():Observable<boolean> {


    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    return this.http.get<User>(`${URL_API}/usuario.php`)
      .pipe(
        tap(user=>this.user=user),//tap: efecto secundario para almacenar el usuario
        map(user=>!!user),//map: transformamos la salida, hacemos doble negación, negamos y negamos
                          //Basicamente devolvemos true si hay un usuario
                          //Es lo mismo que poner map ( user => user? true : false)
        catchError(err=>of(false))//y si el backend devuelve error, es false
      )
  }

  doLogout() {
    const body = new FormData();
    const usuario = localStorage.getItem('usuario');
    body.append('user', usuario as string);
    this.cookieService.deleteAll();
    localStorage.clear();
    return this.http.post(`${URL_API}/logout.php`, body);
  }

  resetPassword(formularioCorreo?: any) {
    const body = JSON.stringify(formularioCorreo);
    return this.http.post<ApiResponse>(`${URL_API}/olvidar_pwd.php`, body, {headers: this.commonService.headersSge});
  }

  checkPassToken(tokenPasswd: string) {

    const body = JSON.stringify({ token: tokenPasswd });

    return this.http.post<ApiResponse>(`${URL_API}/check_token_passwd.php`, body);
  }

  generateNewPass(data: any) {
    const body = JSON.stringify(data);

    return this.http.put<ApiResponse>(`${URL_API}/reset_pass.php`, body);

  }


}
