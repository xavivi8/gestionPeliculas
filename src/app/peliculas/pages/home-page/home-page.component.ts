import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit{
  public menu = {label: 'Menú', icon: 'menu'}

  public sidebarItems = [
    { label: 'Inicio', icon: 'home', url: '/inicio' },
    { label: 'Favoritos', icon: 'favorite', url: './fav'},
    { label: 'Buscar', icon: 'search', url: './search'}
  ]

  constructor (
    private router: Router
  ){}
  ngOnInit(): void {
    this.router.navigate(['/peliculas/search']);
  }
}
