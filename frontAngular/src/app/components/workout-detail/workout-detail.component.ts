import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EjercicioEtto } from 'src/app/interfaces/ejercicio';
import { Entrenamiento } from 'src/app/interfaces/entrenamiento';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {

  @Input() fecha: {day:"",month:"",year:""};
  @Output() changeComponent = new EventEmitter<boolean>();

  entrenamiento: Entrenamiento = null;

  constructor(private entrenamientoService: EntrenamientoService, private irHacia: Router) { }

  ngOnInit(): void {
    this.recuperarEtto();
  }

  cambiarComponente() {
    this.changeComponent.emit(false);
}

  recuperarEtto(): void {
    let fechaFormatted = this.fecha.year + "-" + this.fecha.month + "-" + this.fecha.day;
    this.entrenamientoService.recuperarEtto(fechaFormatted).subscribe(
      respuesta => {
        console.log(respuesta),
        this.entrenamiento = respuesta;
      }
    )
  }

  borrarEtto(): void {
    let fechaFormatted = this.fecha.year + "-" + this.fecha.month + "-" + this.fecha.day;
    this.entrenamientoService.borrarEtto(fechaFormatted).subscribe(
      respuesta => {
        console.log(respuesta)
      }
    )
    this.cambiarComponente();
  }

}
