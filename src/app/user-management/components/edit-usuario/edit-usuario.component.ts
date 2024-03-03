import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from '../../interfaces/rol.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolsService } from '../../service/rols.service';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../interfaces/usuario.interface';
import { CLOSE, INVALID_FORM } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({});
  roles: Rol[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditUsuarioComponent>,
    private servicioRoles: RolsService,
    private servicioUsuario: UserService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
  ) { }

  /**
   * Método del ciclo de vida de Angular llamado después de que Angular haya
   * inicializado todas las propiedades del componente.
   * Inicializa el formulario de usuario y obtiene la lista de roles disponibles.
   */
  ngOnInit() {

    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl(this.usuario.id_usuario, [Validators.required]),
      usuario: new FormControl(this.usuario.usuario, [Validators.required, Validators.email]),
      nombre_publico: new FormControl(this.usuario.nombre_publico),
      password: new FormControl(''),
      habilitado: new FormControl(Number(this.usuario.habilitado) === 1, [Validators.required]),
      id_rol: new FormControl(this.usuario.id_rol, [Validators.required]),
      observaciones: new FormControl(this.usuario.observaciones)
    });

    this.getRoles();
  }

  /**
   * Método asincrónico para obtener la lista de roles disponibles.
   * Asigna la lista de roles al arreglo `roles`.
   */
  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (RESPONSE && RESPONSE.ok) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  /**
   * Método asincrónico para confirmar la edición del usuario.
   * Realiza la solicitud para editar el usuario y muestra un mensaje de éxito o error.
   */
  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await this.servicioUsuario.editUsuario(usuario).toPromise();
      if (RESP && RESP.ok) {
        this.snackBar.open(RESP.message || '', CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
      } else {
        if (RESP) {
          this.snackBar.open(RESP.message || 'Error al editar usuario', CLOSE, { duration: 5000 });
        } else {
          this.snackBar.open('Error al editar usuario', CLOSE, { duration: 5000 });
        }
      }
    } else {
      this.snackBar.open(INVALID_FORM, "Cerrado", { duration: 5000 });
    }
  }

  /**
   * Método para cerrar el dialog
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }

}
