import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/usuario.interfaces';
import { URL_API } from 'src/environments/environments';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

@Injectable({providedIn: 'root'})
/**
 * Servicio de autenticación.
 */
export class AuthService {

  public user?: User;


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private commonService: SharedService
  ) { }

  /**
   * Realiza la autenticación del usuario mediante el envío de datos de inicio de sesión.
   * @param {any} data - Los datos de inicio de sesión del usuario.
   * @returns {Observable<ApiResponse>} - Un observable que emite una respuesta de la API.
   */
  doLogin(data: any) {

    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API}/login.php`, body);
  }

  /**
   * Solicita restablecer la contraseña del usuario.
   * @param {any} formularioCorreo - Opcional. Los datos del formulario de restablecimiento de contraseña.
   * @returns {Observable<ApiResponse>} - Un observable que emite una respuesta de la API.
   */
  resetPassword(formularioCorreo?: any) {
    const body = JSON.stringify(formularioCorreo);
    return this.http.post<ApiResponse>(`${URL_API}/olvidar_pwd.php`, body, {headers: this.commonService.headersSge});
  }

  /**
   * Verifica la validez de un token de contraseña.
   * @param {string} tokenPasswd - El token de contraseña a verificar.
   * @returns {Observable<ApiResponse>} - Un observable que emite una respuesta de la API.
   */
  checkPassToken(tokenPasswd: string) {

    const body = JSON.stringify({ token: tokenPasswd });

    return this.http.post<ApiResponse>(`${URL_API}/check_token_passwd.php`, body);
  }

  /**
   * Genera una nueva contraseña para el usuario.
   * @param {any} data - Los datos necesarios para generar la nueva contraseña.
   * @returns {Observable<ApiResponse>} - Una observable que emite una respuesta de la API.
   */
  generateNewPass(data: any) {
    const body = JSON.stringify(data);

    return this.http.put<ApiResponse>(`${URL_API}/reset_pass.php`, body);

  }


}
