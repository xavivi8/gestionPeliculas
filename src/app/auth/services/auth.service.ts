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

  public async isAuthenticated(url: string): Promise<boolean> {

    let rutaSeleccionada: string;
    const promise = new Promise<boolean>((resolve, reject) => {
      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];
      this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=${ rutaSeleccionada }`,  { headers: this.commonService.getHeaders() } )
      .subscribe((response: ApiResponse) => {
      resolve(response.ok);
      });
    });
    return promise;
  }

  checkAuthentication():Observable<boolean> {


    if (!localStorage.getItem('token')) return of(false); //no necesitamos operacion asincrona

    const token = localStorage.getItem('token');
    console.log("Hola"+localStorage.getItem('token'));
    return this.http.get<User>(`${URL_API}/usuario.php`)
      .pipe(
        tap(user=>console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+user)),
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
