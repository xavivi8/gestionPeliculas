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

  constructor(
    private peliculasService: PeliculasService
  ){}

  ngOnInit(): void {
    this.peliculasService.getFilmByName("Peliculas").subscribe( root => {
      if (root == undefined) return;
      console.log(root)
      this.peliculas = root.results;
    })
  }

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
