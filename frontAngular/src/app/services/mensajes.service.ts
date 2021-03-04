import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';

const url = 'http://localhost/backendphp/mensajes/';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http: HttpClient) { }

  leerMensajes(): Observable<any> {
    return this.http.get(url);
  }

  listarMensajes(id: number): Observable<any> {
    return this.http.get(url+'list'+'?id='+id);
  }

  enviarMensaje(mensaje: Mensaje): Observable<any> {
    return this.http.post(url, mensaje);
  }

  eliminarMensaje(id: number): Observable<any> {
    return this.http.delete(url+id);
  }

  borrarChat(id: number): Observable<any> {
    return this.http.delete(url+'chat'+'?id='+id);
  }

}