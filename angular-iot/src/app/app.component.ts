import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DeviceDataService } from './services/device-data.service';
import { DeviceWebSocketService } from './services/device-web-socket.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { Temperature } from './interface/temperature';
import { ApiNodeService } from './services/api-node.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private temperatureData : Temperature[] = []
  private subscription! : Subscription;


  constructor(private deviceService : DeviceDataService, private apiNode : ApiNodeService)
  {
  
  }

  ngOnInit(): void {
    this.subscription = interval(10000).pipe(
      switchMap(() => this.deviceService.getDataTemperature())
    ).subscribe(deviceData => {
      

      const temp : Temperature = {
        value : deviceData.last_value.value,
        date : deviceData.created_at
      }
      console.log(this.temperatureData)
    });
  }
}
