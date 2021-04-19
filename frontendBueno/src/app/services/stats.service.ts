import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost/backendBueno/stats/';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  obtenerStatsPesoCorporal(): Observable<any> {
    return this.http.get(url+'pesoCorporal');
  }

  obtenerStatsVolumen(categoria?: string, fecha?: string): Observable<any> {
    return this.http.get(url+'volumen'+'?categoria='+categoria+'&fecha='+fecha);
  }

  obtenerStatsIntensidad(categoria?: string, fecha?: string): Observable<any> {
    return this.http.get(url+'intensidad'+'?categoria='+categoria+'&fecha='+fecha);
  }

  obtenerEttoCategoria(): Observable<any> {
    return this.http.get(url+'ettocategoria');
  }

  obtenerCategorias(): Observable<any> {
    return this.http.get(url+'categorias');
  }
 }
