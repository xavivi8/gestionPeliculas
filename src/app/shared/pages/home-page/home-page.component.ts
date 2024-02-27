import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

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
    { label: 'Control usuarios', icon: 'person', url: '/user-management' },
    { label: 'Login', icon: 'login', url: '/auth' }
  ]

  constructor (
    private router: Router,
    private sharedService: SharedService,
  ){}

  logout(){
    this.sharedService.doLogout()
  }
}
