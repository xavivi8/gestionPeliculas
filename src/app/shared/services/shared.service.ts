import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { URL_API } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
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
      'Content-Type':  'application/json',
      Authorization : `Bearer ${localStorage.getItem('token')}`
    });
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type':  'application/json',
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
}
