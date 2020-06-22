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

  public getData() {
    return this.dbData;
  }

  //load the json data from server
  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('/db.json')
        .subscribe(response => {
          this.dbData = this.fixData(response);
          console.log("after loading and fixing", this.dbData);
          this.dbStatus = 1;
          resolve(true);
      })
    })
  }

  // Add default tables to json data, Add keys to all the data
  fixData(data){
    if(!data) {
      return false;
    }
 
    //Make the array with proper key value
    for(let table in data) {
      var keys = data[table]['_describe'];
      for(let row_id in data[table]) {
        var _tmp_row = {};
        for(let key_id in keys) {
          _tmp_row[keys[key_id]] = data[table][row_id][key_id];
        }
        _tmp_row['metatbl'] = data[table][row_id]['metatbl'];
        data[table][row_id] = _tmp_row;
      }
    }
    
    var _defaultTables: string[] = ['options', 'posts', 'terms', 'term_relationships', 'term_taxonomy', 'users'];
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

  getMetadata(meta_key:string, entity: any){
    if(entity && entity.metatbl && entity.metatbl[meta_key] ) {
      if(Array.isArray(entity.metatbl[meta_key]) && entity.metatbl[meta_key][1]) {
        return entity.metatbl[meta_key][1];  
      }
      else {
        entity.metatbl[meta_key]
      }
    }
    return false;
  }

  //Get term data
  getTerm(term_id: number) {
    return this.getEntity('terms', term_id);
  }  

  //Get post data
  getPost(post_id: number){
    return this.getEntity('posts', post_id);
  }

  getEntity(table: string, id: number) {
    if(this.dbData && this.dbData[table] && this.dbData[table][id]) {
      return this.dbData[table][id];
    }
    return false;    
  }
  
  //Get complete User data
  getUser(user_id: number) {
    return this.getEntity('users', user_id);
  }
}
