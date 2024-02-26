import { Component, Input } from '@angular/core';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';
import { PeliculasService } from '../../services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'peliculas-card-pelicula-fav',
  templateUrl: './card-pelicula-fav.component.html',
  styles: [
  ]
})
export class CardPeliculaFavComponent {
  fav:boolean = false;
  @Input()
  public pelicula!: ResultadoID;

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
