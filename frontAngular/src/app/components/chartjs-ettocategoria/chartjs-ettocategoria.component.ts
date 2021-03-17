import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-chartjs-ettocategoria',
  templateUrl: './chartjs-ettocategoria.component.html',
  styleUrls: ['./chartjs-ettocategoria.component.css']
})
export class ChartjsEttocategoriaComponent implements OnInit {


  grafica: Chart;

	constructor(private statsService: StatsService) { }
  
  ngOnInit(): void {
	this.grafica = new Chart('ettocategoria',{
		type: 'doughnut',
			  data: {
				  datasets: [{
					  data: [],
            backgroundColor: [
              'orange',
              'green',
              'red',
              'yellow',
			  'blue',
			  'purple'
            ],
            label: 'Data'
				  }],
          labels: []
			  },
			  options: {
				  responsive: true,
				  title: {
					  display: true,
					  text: 'Nº ejercicios por categoría'
				  }
			  }
	})
	this.getStatsEttoCategoria();
  }

  getStatsEttoCategoria(): void{
	this.statsService.obtenerEttoCategoria().subscribe(
		  respuesta => {
			  console.log(respuesta),
			  this.grafica.data.labels = respuesta.map(el => el.label);
			  this.grafica.data.datasets[0].data = respuesta.map(el => el.data);
			  this.grafica.update();
        /*
        respuesta.array.forEach(element => {
          //this.grafica.data.datasets[0].backgroundColor.push()
        });
        */
		  },
		  error => {
			  console.log(error)
		  }
	  )
   }

}
