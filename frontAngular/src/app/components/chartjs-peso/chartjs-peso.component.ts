import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-chartjs-peso',
  templateUrl: './chartjs-peso.component.html',
  styleUrls: ['./chartjs-peso.component.css']
})
export class ChartjsPesoComponent implements OnInit {
  grafica: Chart;

	constructor(private statsService: StatsService) { }
  
    ngOnInit(): void {
	this.grafica = new Chart('pesoCorporal',{
		type: 'line',
			  data: {
				  labels: [],
				  datasets: [{
					  label: 'Peso Corporal',
					  backgroundColor: 'red',
					  borderColor: 'red',
					  data: [],
					  fill: false,
				  }]
			  },
			  options: {
				  responsive: true,
				  title: {
					  display: true,
					  text: 'Peso Corporal'
				  },
				  tooltips: {
					  mode: 'index',
					  intersect: false,
				  },
				  hover: {
					  mode: 'nearest',
					  intersect: true
				  },
				  scales: {
					  xAxes: [{
						  display: true,
						  scaleLabel: {
							  display: true,
							  labelString: 'Tiempo (meses)'
						  }
					  }],
					  yAxes: [{
						  display: true,
						  scaleLabel: {
							  display: true,
							  labelString: 'Peso (Kg)'
						  }
					  }]
				  }
			  }
	})
	this.getStatsPesoCorporal();
  }

  getStatsPesoCorporal(): void{
	this.statsService.obtenerStatsPesoCorporal().subscribe(
		  respuesta => {
			  console.log(respuesta),
			  this.grafica.data.labels = respuesta.map(el => el.label);
			  this.grafica.data.datasets[0].data = respuesta.map(el => el.data);
			  this.grafica.update();
		  },
		  error => {
			  console.log(error)
		  }
	  )
   }

}
