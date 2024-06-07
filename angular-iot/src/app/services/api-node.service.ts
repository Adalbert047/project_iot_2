import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Temperature } from '../interface/temperature';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiNodeService {

  private urlAPI : string = 'http://localhost:3000/api'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}) 

  constructor(private http : HttpClient) { 

  }


  getDataTemps() : Observable<Temperature[]>
  {
    return this.http.get<Temperature[]>(`${this.urlAPI}/temp`, {headers : this.httpHeaders}).pipe(
      catchError( e => {
          return throwError(e)
      })
    )
  }

  postDataTemp(temp : Temperature) : Observable<Temperature>
  {
    return this.http.post<Temperature>(`${this.urlAPI}/temp`,temp, { headers : this.httpHeaders}).pipe(
      catchError( e => {
          return throwError(e)
      })
    )
  }


}
