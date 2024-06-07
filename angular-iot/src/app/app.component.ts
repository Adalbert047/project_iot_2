import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TempComponent } from './pages/temp/temp.component';
import { HumidityComponent } from './pages/humidity/humidity.component';
import { C02Component } from './pages/c02/c02.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TempComponent, HumidityComponent, C02Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
