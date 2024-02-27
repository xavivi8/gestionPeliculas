import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailValidation'
})

/**
 * Clase que define el Pipe para validar el formato de correo electrónico
 */
export class EmailValidationPipe  implements PipeTransform {
  /**
   * Transforma una dirección de correo electrónico y devuelve true si tiene un formato válido, de lo contrario, devuelve false.
   * @param email La dirección de correo electrónico a validar.
   * @returns true si la dirección de correo electrónico tiene un formato válido, de lo contrario, false.
   */
  transform(email: string | null | undefined): boolean {
    // Expresión regular para validar el formato de la dirección de correo electrónico
    const emailPattern = /^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\s*(com|es)\s*$/;
    if(email === null || email === undefined){
      return false;
    }
    return emailPattern.test(email);
  }
}
