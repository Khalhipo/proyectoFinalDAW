import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrenamiento } from '../interfaces/entrenamiento';

const url = 'http://localhost/backendphp/entrenamientos/';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  constructor(private http: HttpClient) { }

  listarEjercicios(): Observable<any> {
    return this.http.get(url+'listEj');
  }

  crearEtto(etto: Entrenamiento): Observable<any> {
    return this.http.post(url,etto);
  }
}
