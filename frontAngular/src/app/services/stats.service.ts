import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost/backendphp/stats/';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  obtenerStatsPesoCorporal(): Observable<any> {
    return this.http.get(url+'pesoCorporal');
  }

  obtenerStatsVolumen(): Observable<any> {
    return this.http.get(url+'volumen');
  }

  obtenerStatsIntensidad(): Observable<any> {
    return this.http.get(url+'intensidad');
  }
}
