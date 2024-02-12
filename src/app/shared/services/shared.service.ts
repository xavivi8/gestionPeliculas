import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SharedService {

  private bearer_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWExOTJlMDRhMmUxNjQxY2UwM2Q3YmIwZjM0MmQyYSIsInN1YiI6IjY1YzNhOWFlY2ZmZWVkMDE2MzUxNzIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZczhan4Mfx7xuuQVTaB0TWdQaI0E4Hsd-CnslPQWYg";
  headersFilm: HttpHeaders;
  headersSge: HttpHeaders;

  constructor(
    private http: HttpClient
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

}
