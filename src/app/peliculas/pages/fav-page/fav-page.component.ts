import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliFav } from '../../interfaces/peliculas-fav.interfaces';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';

@Component({
  selector: 'app-fav-page',
  templateUrl: './fav-page.component.html',
  styles: [
  ]
})
export class FavPageComponent implements OnInit{
  public pelisFav: PeliFav[] = [];
  public peliculas: ResultadoID[] = []
  constructor(
    private peliculasService: PeliculasService
  ){}

  ngOnInit(): void {
    this.getPeliculas();
  }

  getPeliculas(): void {
    if(localStorage.getItem('usuario') !== null){
      this.getPelisFavPorUsuario(localStorage.getItem('usuario') || '');
    }

    this.pelisFav.forEach(peli => {
      console.log('Identificador de película favorita:', peli.identificador);
    });
  }

  agregarPeliFav(usuario: string, identificador: number): void {
    this.peliculasService.agregarPeliFav(usuario, identificador).subscribe(result => {
      if (result) {
        console.log('Película favorita agregada correctamente');
        // Realizar alguna acción adicional si es necesario
      } else {
        console.error('Error al agregar la película favorita');
      }
    });
  }

  eliminarPeliFav(usuario: string, identificador: number): void {
    this.peliculasService.eliminarPeliFav(usuario, identificador).subscribe(result => {
      if (result) {
        console.log('Película favorita eliminada correctamente');
        // Realizar alguna acción adicional si es necesario
      } else {
        console.error('Error al eliminar la película favorita');
      }
    });
  }

  getPelisFavPorUsuario(usuario: string): void {
    this.peliculasService.getPeliculasFavoritas(usuario).subscribe((peliFav: PeliFav[]) => {
      this.pelisFav = peliFav;
    });
  }
}
