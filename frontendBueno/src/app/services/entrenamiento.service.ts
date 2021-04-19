import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EjercicioLista, EjercicioMostrar } from '../interfaces/ejercicio';
import { Entrenamiento } from '../interfaces/entrenamiento';

const url = 'http://localhost/backendBueno/entrenamientos/';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  constructor(private http: HttpClient) { }

  listarEjercicios(): Observable<any> {
    return this.http.get(url+'listEj');
  }

  crearEjercicio(ejercicioNuevo: EjercicioLista): Observable<any> {
    return this.http.post(url+'ejer',ejercicioNuevo);
  }

  crearEtto(etto: Entrenamiento): Observable<any> {
    return this.http.post(url,etto);
  }

  editarEtto(etto: Entrenamiento): Observable<any> {
    return this.http.put(url,etto);
  }

  recuperarEtto(fecha: string): Observable<any> {
    return this.http.get(url+'etto'+'?fecha='+fecha);
  }

  borrarEtto(fecha: string): Observable<any> {
    return this.http.delete(url+'etto'+'?fecha='+fecha);
  }
}
