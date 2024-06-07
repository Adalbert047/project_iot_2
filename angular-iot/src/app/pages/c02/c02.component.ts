import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Co2 } from '../../interface/co2';
import { DeviceDataService } from '../../services/device-data.service';

@Component({
  selector: 'app-c02',
  standalone: true,
  imports: [],
  templateUrl: './c02.component.html',
  styleUrl: './c02.component.css'
})
export class C02Component {

  private lables : string[] = []
  private labelsName :any[]=[]
  private co2Data : Co2[] = []
  public myChart!: Chart;


  constructor(private deviceService : DeviceDataService)
  {
  }


  ngOnInit(): void {
    this.deviceService.getDataCo2().subscribe(
      (response : Co2[]) => 
      {
        this.co2Data = response.map(co2 => 
          {
            co2.timestamp = new Date(co2.timestamp)
            return co2
          }
        )
        this.labelsName = Array.from(new Set(this.co2Data.map(co2 => co2.timestamp.getMonth())));
        this.labelsName.sort((a, b) => a - b);
        this.preChart()
      }
    )
  }


  preChart()
  {
    const dateLabels = Array.from(new Set(this.co2Data.map(co2 => co2.timestamp.toISOString())));
    dateLabels.sort();
    const co2DataValues = this.co2Data.map(co2 => co2.value)
    const data = {
      labels: dateLabels.map(date => {
        const timestamp = new Date(date);
        return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} - ${timestamp.getHours()}:${timestamp.getMinutes()}`;
      }),
      datasets: [{
        label: 'Co2',
        data: co2DataValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    this.myChart = new Chart("chartCo2", {
      type : 'line',
      data : data
      }
    )
  }

}
