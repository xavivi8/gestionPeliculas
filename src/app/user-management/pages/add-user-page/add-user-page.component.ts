import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../interfaces/rol.interface';
import { RolsService } from '../../service/rols.service';
import { UserService } from '../../service/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent {
  usuarioForm: FormGroup = new FormGroup({});
  roles: Rol[] = [];

  constructor(
    private servicioRoles: RolsService,
    private servicioUsuario: UserService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya
   * inicializado todas las propiedades del componente.
   * Inicializa el formulario de usuario y obtiene la lista de roles disponibles.
   */
  ngOnInit() {
    this.usuarioForm = new FormGroup({
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]),
      nombre_publico: new FormControl(null),
      observaciones: new FormControl(null)
    });

    this.getRoles();
  }

  /**
   * Método asincrónico para obtener la lista de roles disponibles.
   * Asigna la lista de roles al arreglo `roles`.
   */
  async getRoles() {
    const RESPONSE = await firstValueFrom(this.servicioRoles.getAllRoles());
    if (RESPONSE && RESPONSE.ok) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  /**
   * Método asincrónico para confirmar la adición de un nuevo usuario.
   * Realiza la solicitud para agregar el usuario y muestra un mensaje de éxito o error.
   */
  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await firstValueFrom(this.servicioUsuario.addUsuario(usuario));
      if (RESP && RESP.ok) {
        this.snackBar.open(RESP.message || '', CLOSE, { duration: 5000 });
        this.onNoClick();
      } else {
        this.snackBar.open(RESP?.message || 'Error al agregar usuario', CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  /**
   * Método para cerrar el dialog
   */
  onNoClick(): void {
    this.router.navigate(['/user-management/list']);
  }
}
