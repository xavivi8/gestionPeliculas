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
  private usuario: string = localStorage.getItem('usuario') || '';
  fav:boolean = true;
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

   if (this.fav) {
      // Si está en favoritos, lo eliminamos


      this.eliminarPeliFav(this.pelicula.id);
    } else {
      // Si no está en favoritos, lo agregamos
      this.agregarPeliFav(this.pelicula.id);
    }
    this.fav = !this.fav;
  }

  mas(){
    this.peliculasService.setPeliculaSeleccionada(this.pelicula);
    this.router.navigate([`./peliculas/datalles/${this.pelicula.id}`]);
  }

  agregarPeliFav(identificador: number): void {

    this.peliculasService.agregarPeliFav(this.usuario, identificador).subscribe(result => {
      if (result) {
        console.log('Película favorita agregada correctamente');
        // Realizar alguna acción adicional si es necesario
      } else {
        console.error('Error al agregar la película favorita');
      }
    });
  }

  eliminarPeliFav(identificador: number): void {
    console.log(identificador);
   console.log(this.usuario);
    this.peliculasService.eliminarPeliFav(this.usuario, identificador).subscribe(result => {
      if (result) {
        console.log('Película favorita eliminada correctamente');
        // Realizar alguna acción adicional si es necesario
      } else {
        console.error('Error al eliminar la película favorita');
      }
    });
  }

}
