import { Component, OnInit } from '@angular/core';
import { DeviceDataService } from '../../services/device-data.service';
import { Temperature } from '../../interface/temperature';
import { Chart } from 'chart.js/auto';
import { ApiNodeService } from '../../services/api-node.service';

@Component({
  selector: 'app-temp',
  standalone: true,
  imports: [],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css'
})
export class TempComponent{
  private lables : string[] = []
  private labelsName :any[]=[]
  private temperatureData : Temperature[] = []
  public myChart!: Chart;


  constructor(private deviceService : DeviceDataService, private apiNode : ApiNodeService)
  {
  }

  ngOnInit(): void {
    this.deviceService.getDataTemperature().subscribe(
      (response : Temperature[]) => 
      {
        this.temperatureData = response.map(temp => 
          {
            temp.timestamp = new Date(temp.timestamp)
            return temp
          }
        )
        this.labelsName = Array.from(new Set(this.temperatureData.map(temp => temp.timestamp.getMonth())));
        this.labelsName.sort((a, b) => a - b);
        this.preChart()
      }
    )
  }

  preChart()
  {
    const dateLabels = Array.from(new Set(this.temperatureData.map(temp => temp.timestamp.toISOString())));
    dateLabels.sort();
    const temperaturaValues = this.temperatureData.map(temp => temp.value)
    const data = {
      labels: dateLabels.map(date => {
        const timestamp = new Date(date);
        return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} - ${timestamp.getHours()}:${timestamp.getMinutes()}`;
      }),
      datasets: [{
        label: 'Temperatura',
        data: temperaturaValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    this.myChart = new Chart("chartTemp", {
      type : 'line',
      data : data
      }
    )
  }


  get TemperatureData()
  {
    return this.temperatureData
  }
}
