import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { FormControl } from '@angular/forms';
import { Pelicula } from '../../interfaces/peliculas.interfaces';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit{
  public searchInput = new FormControl('');
  public peliculas: Pelicula[] = [];

  constructor(
    private peliculasService: PeliculasService
  ){}

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya inicializado todas las propiedades del componente.
   * Realiza una búsqueda inicial de películas al cargar la página.
   * @returns {void}
   */
  ngOnInit(): void {
    this.peliculasService.getFilmByName("Peliculas").subscribe( root => {
      if (root == undefined) return;
      console.log(root)
      this.peliculas = root.results;
    })
  }



  /**
   * Método para buscar películas basadas en el término de búsqueda proporcionado.
   * @returns {void}
   */
  buscarPelicula(){
    this.searchInput.addAsyncValidators;
    const value: string = this.searchInput.value || '';
    //console.log(this.searchInput);

    console.log(value)
    this.peliculasService.getFilmByName(value).subscribe( root => {
      if (root == undefined) return;
      console.log(root)
      this.peliculas = root.results;
    })
  }
}
