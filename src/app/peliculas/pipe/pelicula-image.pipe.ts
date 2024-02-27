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
   * @param value La URL de la imagen de la película.
   * @returns La URL completa de la imagen de la película.
   */
  transform(value: string | undefined): string {
    if(value === undefined) {
      return 'assets/no-image.png';
    }
    const baseUrl = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
    return `${baseUrl}${value}`;
  }
}
