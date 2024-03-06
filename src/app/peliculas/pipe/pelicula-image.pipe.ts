import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePelicula'
})
/**
 * Clase que define el Pipe para transformar la URL de la imagen de la película.
 */
export class PeliculaImagePipe  implements PipeTransform {
  /**
   * Transforma la URL de la imagen de la película.
   * Si la URL es indefinida, devuelve la URL de una imagen de reemplazo por defecto.
   * @param {string | null} value La URL de la imagen de la película.
   * @returns La URL completa de la imagen de la película.
   */
  transform(value : string | null | undefined): string {
      if(value?.endsWith("null")){
        console.log('noimg')
        return '/assets/no-image.jpg';
      }else{
       return "https://image.tmdb.org/t/p/w500/" + value
      }
  }
}
