import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { EmailValidationPipe } from '../../pipe/email-validation.pipe';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  showContent: boolean = false;
  isLinear = false;
  isLoading = false;
  private elEmail = '';
  public isValidEmail: boolean = false;
  public emailForm = new FormGroup({
    email: new FormControl(''),
  });
  loginForm: FormGroup;


  constructor(
    private emailValidationPipe: EmailValidationPipe,
    private _formBuilder: FormBuilder,
    private router: Router,
    private commonService: SharedService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.emailForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.loginForm = this._formBuilder.group({
      username: [{ value: this.elEmail, disabled: true }, Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya
   * inicializado todas las propiedades del componente.
   * Inicializa el componente y establece un temporizador para mostrar el contenido
   * después de un tiempo de espera y suscribe al cambio del campo de correo electrónico.
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
      this.isLoading = true;
    }, 2000);

    // Suscripción al cambio del campo de correo electrónico
    this.emailForm.get('email')?.valueChanges.subscribe(() => {
      this.handleEmailInputChange();
    });

  }

  /**
   * Maneja el cambio en la entrada de correo electrónico.
   * Verifica la validez del correo electrónico ingresado y actualiza el formulario de inicio de sesión en consecuencia.
   * @returns {void}
   */
  handleEmailInputChange() {
    if (this.emailForm.invalid) return;
    console.log("Email: " + this.emailForm.get('email')?.value);

    this.isValidEmail = this.emailValidationPipe.transform(this.emailForm.value.email);
    console.log(this.isValidEmail);

    if (this.isValidEmail === true) {
      this.elEmail = this.emailForm.value.email || '';
      this.loginForm.get('username')?.setValue(this.elEmail);
      console.log(this.isValidEmail);
      console.log("Email " + this.emailForm.get('email')?.value);
    }

  }

  /**
   * Maneja el evento de envío del formulario.
   * Avanza al siguiente paso si el correo electrónico es válido.
   * @param {MatStepper} stepper El componente MatStepper para la navegación entre pasos.
   * @returns {void}
   */
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

  /**
   * Método asincrónico para realizar el proceso de inicio de sesión.
   * @returns {void}
   */
  async acceder() {

    setTimeout(() => {
      this.isLoading = true;
    }, 2000);

    this.isLoading = false;
    if (this.loginForm.valid && this.isValidEmail) {
      const username = this.emailForm.value.email;
      const password = this.loginForm.get('password')?.value;

      const data = { username, password };
      console.log(data);

      const RESPONSE = await this.authService.doLogin(data).toPromise();
      console.log(RESPONSE);
      if (RESPONSE === undefined) return;
      if (RESPONSE.ok) {
        if (RESPONSE.data.token) {
          // this.cookieService.set('token', RESPONSE.data.token);
          console.log('ya he puesto el token');
          localStorage.setItem('token', RESPONSE.data.token);
          console.log('token' + RESPONSE.data.token);

          localStorage.setItem('usuario', RESPONSE.data.usuario);
          localStorage.setItem('nombre_publico', RESPONSE.data.nombre_publico);
          localStorage.setItem('ultimaOpcion', RESPONSE.data.opcion);
          localStorage.setItem('ultimoGrupo', RESPONSE.data.grupo);
          localStorage.setItem('id', RESPONSE.data.id_usuario);
          this.commonService.headersSge = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESPONSE.data.token}`
          });
          this.router.navigate([`/peliculas/search`]);
          return;

        } else if (RESPONSE.data.valido === 0) {
          this.snackBar.open('Usuario inhabilitado', CLOSE, { duration: 5000 });
        } else if (RESPONSE.data.valido === 1) {
          this.snackBar.open('Usuario o contraseña incorrectas', CLOSE, { duration: 5000 });
        }
      }
    }
    this.reloadPage();
  }

  /**
   * Recarga la página actual.
   * @returns {void}
   */
  reloadPage(): void {
    location.reload();
  }
}
