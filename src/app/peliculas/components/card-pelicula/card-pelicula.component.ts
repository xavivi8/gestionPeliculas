import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';
import { Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliFav, ResultadoPeliFav } from '../../interfaces/peliculas-fav.interfaces';

@Component({
  selector: 'peliculas-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styles: [
  ]
})
export class CardPeliculaComponent implements OnInit {
  private usuario: string = localStorage.getItem('usuario') || '';
  fav:boolean = false;
  public pelisFav: PeliFav[] = [];
  @Input()
  public pelicula!: Pelicula;

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) { }

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya inicializado todas las propiedades del componente.
   * Verifica si la película existe.
   * @returns {void}
   * @throws Error - Si la película no existe.
   */
  ngOnInit(): void {
    if (!this.pelicula) throw new Error('Pelicula no existe');

    /* Coger las peliculas favoritas */

    this.usuario = localStorage.getItem('usuario') || '';
    this.peliculasService.getPeliculasFavoritas(localStorage.getItem('usuario') || '').subscribe((resultado: ResultadoPeliFav) => {
      if(resultado.ok) { // Verificar si la respuesta fue exitosa
        this.pelisFav = []; // Vaciar el arreglo pelisFav
        this.pelisFav = [...resultado.data]; // Asignar los datos al arreglo pelisFav
        console.log("Películas favoritas del usuario: this.pelisFav", this.pelisFav);
        this.fav = this.buscarPeliFav();
      } else {
        console.error("Error al obtener las películas favoritas del usuario:", resultado.message);
      }
    });
  }

  buscarPeliFav(): boolean {
    return this.pelisFav.some(peli => peli.identificador === this.pelicula.id);
  }

  /**
   * Agrega o elimina la película de la lista de favoritos dependiendo de su estado actual.
   * @returns {void}
   */
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

  /**
   * Agrega la película actual a la lista de películas favoritas del usuario.
   * @param {number} identificador - El id de la película.
   * @returns {void}
   */
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

  /**
   * Elimina la película actual de la lista de películas favoritas del usuario.
   * @param {number} identificador - El id de la película.
   * @returns {void}
   */
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

  /**
   * Método para navegar a la página de detalles de la película seleccionada.
   * Establece la película seleccionada en el servicio de películas antes de la navegación.
   * @returns {void}
   */
  mas(){
    this.peliculasService.setPeliculaSeleccionada(this.pelicula);
    this.router.navigate([`./peliculas/datalles/${this.pelicula.id}`]);
  }
}
