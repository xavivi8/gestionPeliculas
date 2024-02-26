import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliFav, ResultadoPeliFav } from '../../interfaces/peliculas-fav.interfaces';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';

@Component({
  selector: 'app-fav-page',
  templateUrl: './fav-page.component.html',
  styles: [
  ]
})
export class FavPageComponent implements OnInit{
  private usuario: string = localStorage.getItem('usuario') || '';
  public pelisFav: PeliFav[] = [];
  public peliculas: ResultadoID[] = []
  constructor(
    private peliculasService: PeliculasService
  ){}

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || '';
    this.peliculasService.getPeliculasFavoritas(localStorage.getItem('usuario') || '').subscribe((resultado: ResultadoPeliFav) => {
      if(resultado.ok) { // Verificar si la respuesta fue exitosa
        this.pelisFav = []; // Vaciar el arreglo pelisFav
        this.pelisFav = [...resultado.data]; // Asignar los datos al arreglo pelisFav
        console.log("Películas favoritas del usuario: this.pelisFav", this.pelisFav);
        this.getPeliculas();
      } else {
        console.error("Error al obtener las películas favoritas del usuario:", resultado.message);
      }
    });


  }

  getPeliculas(): void {

    //console.log(this.pelisFav);

    this.pelisFav.forEach(peli => {
      console.log(peli);

      console.log('Identificador de película favoritas ->:' + peli.identificador);
      this.peliculasService.getFilmById(peli.identificador).subscribe((result: ResultadoID | undefined) => {
        if (result) {
          this.peliculas.push(result);
          console.log("Películas ", result);
        } else {
          console.error("La película no se encontró o no se pudo cargar correctamente");
        }
      });
    });

  }


}
