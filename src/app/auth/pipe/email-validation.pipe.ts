import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailValidation'
})

export class EmailValidationPipe  implements PipeTransform {
  transform(email: string | null | undefined): boolean {
    // Expresión regular para validar el formato de la dirección de correo electrónico
    const emailPattern = /^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\s*(com|es)\s*$/;
    if(email === null || email === undefined){
      return false;
    }
    return emailPattern.test(email);
  }
}
