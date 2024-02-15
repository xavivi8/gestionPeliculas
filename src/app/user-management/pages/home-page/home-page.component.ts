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
    { label: 'Control usuarios', icon: 'favorite', url: '/inicio' },
  ]

  constructor (
    private router: Router
  ){}
  ngOnInit(): void {
    this.router.navigate(['/user-management/list']);
  }
}
