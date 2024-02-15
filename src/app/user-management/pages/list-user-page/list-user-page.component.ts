import { Component, OnInit, ViewChild } from '@angular/core';
import { Permises } from 'src/app/auth/interfaces/usuario.interfaces';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'; // Importar MatPaginatorIntl
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../service/user.service';
import { DeleteUsuarioComponent } from '../../components/delete-usuario/delete-usuario.component';
import { EditUsuarioComponent } from '../../components/edit-usuario/edit-usuario.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styles: []
})
export class ListUserPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  permises: Permises = { edit: false, delete: false, add: false };

  idFilter = new FormControl();
  usuarioFilter = new FormControl();
  nombreFilter = new FormControl();
  rolFilter = new FormControl();

  displayedColumns: string[] = [];
  private filterValues = { id_usuario: '', usuario: '', nombre_publico: '', rol: '', habilitado: 0 };

  constructor(
    public dialog: MatDialog,
    private servicioUsuarios: UserService,
    private overlay: Overlay,
    private matPaginatorIntl: MatPaginatorIntl // Agregar MatPaginatorIntl al constructor
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    const RESPONSE = await firstValueFrom(this.servicioUsuarios.getAllUsuarios());
    if (RESPONSE !== undefined) {
      this.permises = RESPONSE.permises || { edit: false, delete: false, add: false }; // Manejar caso de permises undefined
      if (RESPONSE.ok) {
        this.displayedColumns = ['id_usuario', 'usuario', 'nombre_publico', 'rol', 'habilitado', 'actions'];
        this.dataSource = new MatTableDataSource(RESPONSE.data as Usuario[]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
        this.onChanges();
      }
    }

  }

  async editUsuario(usuario: Usuario) {

    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      data: usuario,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP && RESP.ok) {
      this.servicioUsuarios.updateUsuario(RESP.data);
      this.dataSource.data = this.servicioUsuarios.usuarios;
    }
  }

  async deleteUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(DeleteUsuarioComponent, { data: usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await firstValueFrom(dialogRef.afterClosed());
    if (RESP && RESP.ok) {
      this.servicioUsuarios.removeUsuario(RESP.data);
      this.dataSource.data = this.servicioUsuarios.usuarios;
    }
  }

  createFilter(): (usuario: any, filter: string) => boolean {
    const filterFunction = (usuario: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return usuario.id_usuario.toString().indexOf(searchTerms.id_usuario.toLowerCase()) !== -1 &&
        usuario.usuario.toLowerCase().indexOf(searchTerms.usuario.toLowerCase()) !== -1 &&
        usuario.nombre_publico.toLowerCase().indexOf(searchTerms.nombre_publico.toLowerCase()) !== -1 &&
        usuario.rol.toLowerCase().indexOf(searchTerms.rol.toLowerCase()) !== -1 &&
        (searchTerms.habilitado === 'todos' ? true : usuario.habilitado.indexOf(searchTerms.habilitado) !== -1);
    };
    return filterFunction;
  }

  onChanges(): void {
    this.idFilter.valueChanges.subscribe(value => {
      this.filterValues.id_usuario = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.usuarioFilter.valueChanges.subscribe(value => {
      this.filterValues.usuario = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nombreFilter.valueChanges.subscribe(value => {
      this.filterValues.nombre_publico = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.rolFilter.valueChanges.subscribe(value => {
      this.filterValues.rol = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  buscarHabilitados(event: any) {
    let value: number;
    event.value === 'todos' ? value = event.value : value = Number(event.value);
    this.filterValues.habilitado = value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
}
