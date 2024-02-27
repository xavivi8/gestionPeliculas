import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

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
    { label: 'Listado usuarios', icon: 'list', url: './list' },
    { label: 'Añadir usuario', icon: 'person_add', url: './add-user' }
  ]

  constructor (
    private router: Router,
    private sharedService: SharedService,
  ){}

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya
   * inicializado todas las propiedades del componente.
   * Navega automáticamente a la lista de usuarios al inicializar la página principal.
   */
  ngOnInit(): void {
    this.router.navigate(['/user-management/list']);
  }

  /**
   * Método para cerrar sesión.
   * Llama al método `doLogout` del servicio `SharedService`.
   */
  logout(){
    this.sharedService.doLogout()
  }
}
