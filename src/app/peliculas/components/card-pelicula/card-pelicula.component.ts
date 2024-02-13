import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';

@Component({
  selector: 'peliculas-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styles: [
  ]
})
export class CardPeliculaComponent implements OnInit {
  @Input()
  public pelicula!: Pelicula;

  ngOnInit(): void {
    if (!this.pelicula) throw new Error('Pelicula no existe');
  }
}
