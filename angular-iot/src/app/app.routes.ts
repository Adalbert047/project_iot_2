import { Routes } from '@angular/router';
import { MainPrimaryComponent } from './pages/main-primary/main-primary.component';
import { TempComponent } from './pages/temp/temp.component';
import { HumidityComponent } from './pages/humidity/humidity.component';
import { C02Component } from './pages/c02/c02.component';

export const routes: Routes = [
    {
        path:"",
        component:MainPrimaryComponent,
        title:"Inicio"
    },
    {
        path:"temperatura",
        component:TempComponent,
        title:"Temperatura"
    },
    {
        path:"humedad",
        component:HumidityComponent,
        title:"Humedad"
    },
    {
        path:"co2",
        component:C02Component,
        title:"Co2"
    }
];
