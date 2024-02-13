import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormato'
})

export class FechaFormatoPipe implements PipeTransform {
  transform(fecha: string | undefined): string {
    if (fecha === undefined) {
      return 'Sin fecha de estreno';
    }
    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return ''; // Devuelve cadena vacía si la fecha no está en el formato esperado
    }

    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const [anio, mes, dia] = fecha.split('-').map(Number);
    return `${dia} de ${meses[mes - 1]} de ${anio}`;
  }
}
