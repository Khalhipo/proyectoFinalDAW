import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  date = new Date();
  calendario: NgbDateStruct = { day: this.date.getUTCDay(), month: this.date.getUTCMonth(), year: this.date.getUTCFullYear()};
  day: string;

  constructor(private calendar: NgbCalendar, private entrenamientoService: EntrenamientoService) { }

  tipoVistaEtto: string;

  ngOnInit(): void {
    this.calendario = this.calendar.getToday();
    this.checkTipoVistaEtto();
  }

  changeComponent(value) {
    setTimeout(()=>this.tipoVistaEtto = value,200);
  }

  checkTipoVistaEtto(): void {
    this.tipoVistaEtto = null;
    let fechaFormatted = this.calendario.year + "-" + this.calendario.month + "-" + this.calendario.day;
    this.entrenamientoService.recuperarEtto(fechaFormatted).subscribe(
      respuesta => {
        if(respuesta.respuesta == undefined){
          this.tipoVistaEtto = "detail";
        } else {
          this.tipoVistaEtto = "create";
        }
      }
    )
  }

}
