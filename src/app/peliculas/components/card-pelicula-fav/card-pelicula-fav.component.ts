import { Component, Input } from '@angular/core';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';
import { PeliculasService } from '../../services/peliculas.service';
import { Router } from '@angular/router';
import { CLOSE } from 'src/app/shared/messages';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya inicializado todas las propiedades del componente.
   * Verifica si la película existe.
   * @returns {void}
   * @throws Error - Si la película no existe.
   */
  ngOnInit(): void {
    if (!this.pelicula) throw new Error('Pelicula no existe');
  }

  /**
   * Agrega o elimina la película de la lista de favoritos dependiendo de su estado actual.
   * @returns {void}
   */
  addFav(){

   if (this.fav) {
      // Si está en favoritos, lo eliminamos


      this.eliminarPeliFav(this.pelicula.id);
      this.snackBar.open('Película eliminada de favoritos', CLOSE, { duration: 5000 });
    } else {
      // Si no está en favoritos, lo agregamos
      this.agregarPeliFav(this.pelicula.id);
      this.snackBar.open('Película agregada a favoritos', CLOSE, { duration: 5000 });
    }
    this.fav = !this.fav;
  }

  /**
   * Navega a la página de detalles de la película seleccionada.
   * Establece la película seleccionada en el servicio de películas antes de la navegación.
   * @returns {void}
   */
  mas(){
    this.peliculasService.setPeliculaSeleccionada(this.pelicula);
    this.router.navigate([`./peliculas/datalles/${this.pelicula.id}`]);
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

}
