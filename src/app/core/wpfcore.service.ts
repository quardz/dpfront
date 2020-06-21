import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { nSQL } from "@nano-sql/core";


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

  public getData() {
    return this.dbData;
  }

  //load the json data from server
  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('/db.json')
        .subscribe(response => {
          this.dbData = this.defaultTable(response);
          this.dbStatus = 1;
          resolve(true);
      })
    })
  }

  // Add default tables to json data
  defaultTable(data){
    if(!data) {
      return false;
    }
    
    var _defaultTables: string[] = ['options', 'posts', 'postmeta', 'terms', 'term_relationships', 'term_taxonomy', 'users', 'usermeta'];
    for(let table in _defaultTables) {
      if(!data.hasOwnProperty(_defaultTables[table])){
        data[_defaultTables[table]] = [];
      }
    }
    return data;
  }

  getOption(option_id: number|string) {

  }

  //Get complete menu tree
  getMenu(menu_name: string) {

  }

  //Get term data
  getTerm(term_id: number) {

  }

  //Get post data
  getPost(post_id: number){

  }
  
  //Get complete User data
  getUser(user_id: number) {
    if(this.dbData && this.dbData.users) {
      nSQL(this.dbData.users).query("select").where(["ID", "=", user_id]).exec().then((row) => {
        console.log("user filter row", row);
        return row;
      });
    }
    
  }

}
