import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WpfcoreService {
  dbStatus: number;
  dbData: any;
  
  constructor( private http: HttpClient) { 
    this.dbStatus = 0;
    this.dbData = null;
  }

  getDb() {
    //http.get('/db.json').pipe(retry(3), catchError(this.handleError)).subscribe((data) => {
    this.http.get('/db.json').subscribe((data) => {
      console.log("data loaded,", data);
      if(data) {

        this.dbStatus = 1;
        this.dbData = data;
        return data;
      }
      return null; 
    });    
  }

  handleError(error: HttpErrorResponse) {
    this.dbStatus = 0; 
  }


}
