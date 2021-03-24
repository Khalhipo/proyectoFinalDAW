import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapa: any
  marcador: any

  constructor() { }

  ngOnInit(): void {
    this.mapa = L.map('posicionMapa').setView([39.39168728470875, -3.2219513175977497], 13);
    const trozos = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom: 19
    })
    trozos.addTo(this.mapa);

    //Añadir un marcador personalizado
    this.marcador = L.marker([39.39168728470875, -3.2219513175977497]).addTo(this.mapa)
    .bindPopup('IES Juan Bosco')
    .openPopup();
  }
}
