import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent {
  public menu = {label: 'Menú', icon: 'menu'}

  public sidebarItems = [
    { label: 'Peliculas', icon: 'movie', url: '/peliculas' },
    { label: 'Login', icon: 'login', url: '/auth' }
  ]

  constructor (
    private router: Router
  ){}
}
