import { Component } from '@angular/core';
import { Humidity } from '../../interface/humidity';
import { Chart } from 'chart.js/auto';
import { DeviceDataService } from '../../services/device-data.service';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.css'
})
export class HumidityComponent {
  private lables : string[] = []
  private labelsName :any[]=[]
  private humidityData : Humidity[] = []
  public myChart!: Chart;


  constructor(private deviceService : DeviceDataService)
  {
  }

  ngOnInit(): void {
    this.deviceService.getDataHumedad().subscribe(
      (response : Humidity[]) => 
      {
        this.humidityData = response.map(hum => 
          {
            hum.timestamp = new Date(hum.timestamp)
            return hum
          }
        )
        this.labelsName = Array.from(new Set(this.humidityData.map(hum => hum.timestamp.getMonth())));
        this.labelsName.sort((a, b) => a - b);
        this.preChart()
      }
    )
  }

  preChart()
  {
    const dateLabels = Array.from(new Set(this.humidityData.map(hum => hum.timestamp.toISOString())));
    dateLabels.sort();
    const temperaturaValues = this.humidityData.map(hum => hum.value)
    const data = {
      labels: dateLabels.map(date => {
        const timestamp = new Date(date);
        return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} - ${timestamp.getHours()}:${timestamp.getMinutes()}`;
      }),
      datasets: [{
        label: 'Humedad',
        data: temperaturaValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    this.myChart = new Chart("chartHumidity", {
      type : 'line',
      data : data
      }
    )
  }
}
