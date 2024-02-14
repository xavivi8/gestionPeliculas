import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/usuario.interfaces';
import { URL_API } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  doLogin(data: any) {

    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API}/login.php`, body);
  }


}
