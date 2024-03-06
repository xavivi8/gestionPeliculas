import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormato'
})

/**
 * Clase que define el Pipe para formatear una fecha en 'YYYY-MM-DD' a 'D de mes de Año'.
 */
export class FechaFormatoPipe implements PipeTransform {
  /**
   * Transforma una fecha en formato 'YYYY-MM-DD' en una cadena con el formato 'D de mes de Año'.
   * Si la fecha es indefinida, devuelve 'Sin fecha de estreno'.
   * @param {string | undefined} fecha La fecha en formato 'YYYY-MM-DD' a formatear.
   * @returns {string} La fecha formateada como 'D de mes de Año'.
   */
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
