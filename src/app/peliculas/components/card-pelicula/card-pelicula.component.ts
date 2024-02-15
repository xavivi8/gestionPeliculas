import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';
import { Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'peliculas-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styles: [
  ]
})
export class CardPeliculaComponent implements OnInit {
  fav:boolean = false;
  @Input()
  public pelicula!: Pelicula;

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.pelicula) throw new Error('Pelicula no existe');
  }

  addFav(){
    this.fav = !this.fav
    console.log(this.fav);

  }

  mas(){
    this.peliculasService.setPeliculaSeleccionada(this.pelicula);
    this.router.navigate([`./peliculas/datalles/${this.pelicula.id}`]);
  }
}
