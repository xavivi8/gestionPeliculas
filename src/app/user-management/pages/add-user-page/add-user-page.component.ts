import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../interfaces/rol.interface';
import { RolsService } from '../../service/rols.service';
import { UserService } from '../../service/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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

  async getRoles() {
    const RESPONSE = await firstValueFrom(this.servicioRoles.getAllRoles());
    if (RESPONSE && RESPONSE.ok) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await firstValueFrom(this.servicioUsuario.addUsuario(usuario));
      if (RESP && RESP.ok) {
        this.snackBar.open(RESP.message || '', 'Cerrar', { duration: 5000 });
        this.onNoClick();
      } else {
        this.snackBar.open(RESP?.message || 'Error al agregar usuario', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Formulario inválido', 'Cerrar', { duration: 5000 });
    }
  }


  onNoClick(): void {
    this.router.navigate(['/user-management/list']);
  }
}
