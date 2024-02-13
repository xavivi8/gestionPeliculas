import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePelicula'
})

export class PeliculaImagePipe  implements PipeTransform {
  transform(value: string | undefined): string {
    if(value === undefined) {
      return 'assets/no-image.png';
    }
    const baseUrl = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
    return `${baseUrl}${value}`;
  }
}
