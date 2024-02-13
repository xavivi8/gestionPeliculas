import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { EmailValidationPipe } from '../../pipe/email-validation.pipe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  showContent: boolean = false;
  isLinear = false;
  public isValidEmail: boolean = false;
  public emailForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(
    private emailValidationPipe: EmailValidationPipe,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 2000);

    // Inicializa el FormGroup
    this.emailForm = this._formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit(stepper: MatStepper) {
    if (this.emailForm.invalid) return;

    this.isValidEmail = this.emailValidationPipe.transform(this.emailForm.value.email);
    console.log(this.isValidEmail);

    if (this.isValidEmail) {
      // Si el correo electrónico es válido, avanza al siguiente paso
      stepper.next();
    } else {
      // Si el correo electrónico no es válido, no avanzar y mostrar un mensaje de error
      console.error('El correo electrónico no es válido.');
    }
  }
}
