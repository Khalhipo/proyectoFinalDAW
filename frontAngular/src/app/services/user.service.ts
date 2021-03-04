import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { accesoUsuario, User } from '../interfaces/user';


const url = 'http://localhost/backendphp/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registrar(usuario: User): Observable<any> {
    return this.http.post(url,usuario);
  }

  acceso(usuario: accesoUsuario): Observable<any> {
    return this.http.post(url+'login/', usuario);
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get(url);
  }

  editarPerfil(usuario: User): Observable<any> {
    return this.http.put(url,usuario);
  }

  eliminarUsuario(): Observable<any> {
    return this.http.delete(url);
  }

  listarUsuario(entrada: string): Observable<any> {
    return this.http.get(url+'list'+ '?busqueda=' + entrada);
  }

  listarAmigos(): Observable<any> {
    return this.http.get(url+'amigos');
  }
  
  subirImagen(entrada): Observable<any>{
    return this.http.post(url+'image/', entrada) 
  }

  addFriend(user: User): Observable<any> {
    return this.http.post(url+'friend/', user);
  }

  eliminarAmigo(id: number): Observable<any> {
    return this.http.delete(url+'friend'+'?id='+id);
  }

  guardarToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('userToken');
  }

  logOut(): void {
    localStorage.removeItem('userToken');
  }

  leerToken(): string {
    return localStorage.getItem('userToken'); 
  }


}
