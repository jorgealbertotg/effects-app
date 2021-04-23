import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import * as usuarioActions from '../actions/usuario.actions';

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) {

  }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap(
        (action) => this.usuariosService.getUserById(action.id)
          .pipe(
            map(user => usuarioActions.cargarUsuarioSuccess({usuario: user})),
            catchError(error => of(usuarioActions.cargarUsuarioError({payload: error})))
          )
      )
    )
  );
}