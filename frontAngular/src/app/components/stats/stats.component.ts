import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  grafica: Chart
  input1: number
  input2: number

  constructor() { }

  ngOnInit(): void {
    this.grafica = new Chart('posicionGrafica',{
      type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: 'red',
					borderColor: 'red',
					data: [1,2,4,6,7,4,12],
					fill: false,
				}, {
					label: 'My Second dataset',
					fill: false,
					backgroundColor: 'blue',
					borderColor: 'blue',
					data: [2,8,1,88,45,33,21],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Line Chart'
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
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
  })
}
 insertarDato(): void {
   this.grafica.data.labels.push(this.grafica.data.labels.length+1);
   this.grafica.data.datasets[0].data.push(this.input1);
   this.grafica.data.datasets[1].data.push(this.input2);
   this.grafica.update();
 }

}
