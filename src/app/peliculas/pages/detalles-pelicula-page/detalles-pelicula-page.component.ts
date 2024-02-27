import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interfaces';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ResultadoID } from '../../interfaces/peliculas-id.interfaces';
import { PeliFav, ResultadoPeliFav } from '../../interfaces/peliculas-fav.interfaces';

@Component({
  selector: 'app-detalles-pelicula-page',
  templateUrl: './detalles-pelicula-page.component.html',
  styleUrls: ['./detalles-pelicula-page.component.css']
})
export class DetallesPeliculaPageComponent implements OnInit {
  public pelicula!: ResultadoID;
  private usuario: string = localStorage.getItem('usuario') || '';
  public pelisFav: PeliFav[] = [];
  fav!:boolean

  constructor(
    private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {}

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya inicializado todas las propiedades del componente.
   * Obtiene la película seleccionada para mostrar detalles basados en el ID de la película proporcionado en la ruta.
   * Navega a la página de búsqueda de películas si la película no se encuentra.
   * @returns {void}
   */
  ngOnInit(): void {
    /* this.pelicula = this.peliculasService.getPeliculaSeleccionada(); */
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.peliculasService.getFilmById(id))
    ).subscribe(peli => {
      if (!peli) return this.router.navigate(['/peliculas/search'])

      this.pelicula = peli
      console.log('Pelicula: ' + this.pelicula)
      console.log('Peli: ' + peli);
      return;
    })

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

}
