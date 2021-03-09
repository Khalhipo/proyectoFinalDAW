import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EjercicioMostrar } from '../interfaces/ejercicio';
import { Entrenamiento } from '../interfaces/entrenamiento';

const url = 'http://localhost/backendphp/entrenamientos/';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  entrenamiento: Entrenamiento;
  ejerciciosETTO: EjercicioMostrar

  constructor(private http: HttpClient) { }

  listarEjercicios(): Observable<any> {
    return this.http.get(url+'listEj');
  }

  crearEtto(etto: Entrenamiento): Observable<any> {
    return this.http.post(url,etto);
  }

  recuperarEtto(fecha: string): Observable<any> {
    return this.http.get(url+'etto'+'?fecha='+fecha);
  }
}
