import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://reqres.in/api';
  }

  getUsers() {
    return this.http.get(`${this.url}/users?per_page=6&delay=3`)
            .pipe(
              map( response => response['data'])
            );
  }

  getUserById(id: string) {
    return this.http.get(`${this.url}/users/${id}`)
            .pipe(
              map( response => response['data'])
            );
  }
}
