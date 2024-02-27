import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    private servicioUsuario: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  /**
   * Método asincrónico para eliminar un usuario.
   * Realiza la solicitud para eliminar el usuario y muestra un mensaje de éxito o error.
   */
  async deleteUser() {
    const RESP = await firstValueFrom(this.servicioUsuario.deleteUsuario(this.usuario));
    if (RESP && RESP.ok) {
      this.snackBar.open(RESP.message || '', CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
    } else {
      this.snackBar.open(RESP.message || '', CLOSE, { duration: 5000 });
    }
  }

  /**
   * Metodo para cerrar el dialog
   */
  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
