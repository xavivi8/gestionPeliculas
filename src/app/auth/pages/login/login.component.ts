import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { EmailValidationPipe } from '../../pipe/email-validation.pipe';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  implements OnInit{
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
    this.loginForm = new FormGroup({
      username: new FormControl({value: this.elEmail, disabled: true}),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
      this.isLoading = true;
    }, 2000);

    // Inicializa el FormGroup
    this.emailForm = this._formBuilder.group({
      email: ['', Validators.required]
    });

    // Suscripción al cambio del campo de correo electrónico
    this.emailForm.get('email')?.valueChanges.subscribe(() => {
      this.handleEmailInputChange();
    });

  }

  handleEmailInputChange() {
    if (this.emailForm.invalid) return;

    this.isValidEmail = this.emailValidationPipe.transform(this.emailForm.value.email);

    if(this.isValidEmail === true){
      this.elEmail = this.emailForm.value.email || '';
      this.loginForm.get('username')?.setValue(this.elEmail);
      console.log(this.isValidEmail);
      console.log("Email "+this.emailForm.get('email')?.value);
    }

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

  async acceder() {

    setTimeout(() => {
      this.isLoading = true;
    }, 2000);

    this.isLoading = false;
    if (this.loginForm.valid) {

      const data = this.loginForm.value;
      const RESPONSE = await this.authService.doLogin(data).toPromise();
        // console.log(response);
        if (RESPONSE === undefined) return;
      if (RESPONSE.ok) {
        if (RESPONSE.data.token) {
          // this.cookieService.set('token', RESPONSE.data.token);
          // console.log('ya he puesto el token');
          localStorage.setItem('token', RESPONSE.data.token);
          localStorage.setItem('usuario', RESPONSE.data.usuario);
          localStorage.setItem('nombre_publico', RESPONSE.data.nombre_publico);
          localStorage.setItem('ultimaOpcion', RESPONSE.data.opcion);
          localStorage.setItem('ultimoGrupo', RESPONSE.data.grupo);
          this.commonService.headersSge = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESPONSE.data.token}`
          });
          this.router.navigate([`/${RESPONSE.data.accion}`]);
          return;

        } else if (RESPONSE.data.valido === 0) {
          this.snackBar.open('Usuario inhabilitado', 'Cerrar', {duration: 5000});
        } else if (RESPONSE.data.valido === 1) {
          this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', {duration: 5000});
        }
      }
    }
    this.reloadPage();
  }

  reloadPage() {
    this.router.navigateByUrl('/auth/login', { skipLocationChange: true });
  }
}
