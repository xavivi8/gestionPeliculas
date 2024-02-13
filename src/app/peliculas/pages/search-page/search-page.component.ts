import { Component } from '@angular/core';
import { PeliculaService } from '../../services/peliculas.service';
import { FormControl } from '@angular/forms';
import { Pelicula } from '../../interfaces/peliculas.interfaces';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor(
    private peliculasService: PeliculaService
  ){}

  public searchInput = new FormControl('');
  public peliculas: Pelicula[] = []

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
