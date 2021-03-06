import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {
  
  usuarios: Usuario[];
  loading: boolean;
  error: any;

  constructor(public usuarioService: UsuarioService, private store: Store<AppState>) {
    this.usuarios = [];
    this.loading = false;
  }

  ngOnInit(): void {
    // this.usuarioService.getUsers().subscribe(users => {
    //   console.log(users);
    //   this.usuarios = users;
    // });
    this.store.select('usuarios').subscribe(({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });
    this.store.dispatch(cargarUsuarios());
  }

}
