import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as _ from 'underscore';
import { nSQL } from "@nano-sql/core";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WpfcoreService {
  dbStatus: number;
  dbData: any;
  URLs: Array<any> = []; //link, component, entity = posts/users, type = post/page, parameters as obj
  
  constructor( 
    private http: HttpClient,   
    private injector: Injector,
  ) { 
    this.dbStatus = 0;
    this.dbData = null;
  }

  public getData() {
    console.log("displayung URLs in getdata()", this.URLs);
    const router = this.injector.get(Router);
    console.log("router", router);

    return this.dbData;
  }

  public getURLs() {
    return this.URLs;
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
      var table_data_new = [];
      for(let row_id in data[table]) {
        var _tmp_row = {};
        for(let key_id in keys) {
          _tmp_row[keys[key_id]] = data[table][row_id][key_id];
        }
        _tmp_row['metatbl'] = data[table][row_id]['metatbl'];
        //data[table][row_id] = _tmp_row; //uncomment this to make rows group with ID
        table_data_new.push(_tmp_row);
        
      }
      data[table] = table_data_new;
    }
    
    var _defaultTables: string[] = ['options', 'posts', 'terms', 'term_relationships', 'term_taxonomy', 'users'];
    for(let table in _defaultTables) {
      if(!data.hasOwnProperty(_defaultTables[table])){
        data[_defaultTables[table]] = [];
      }
    }

    //Generate URLs for contents
    data = this.generatePostURLs(data);

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

  getTermsTree(taxonomy: string){

  }

  //Get recent posts
  public getRecentPosts(limit = 5, post_type = "post") {

    var filters: Array<any> = [
      ["post_type","=",post_type],
      "AND",
      ["post_status","=","publish"]
    ];
    var orderBy: Array<any> = ['post_modified DESC'];
    return this.loadEntity('posts', filters, orderBy, limit).then((rows)=>{
      return rows;
    }).catch((error) => {
      
    });
  }

  //Get term data
  getTerm(term_id: number) {
    return this.getEntityByID('terms', term_id);
  }  

  //Get post data
  getPost(post_id: number){
    return this.getEntityByID('posts', post_id).then((row)=>{
      return row;
    });
  }

  generatePostURLs(data:any, urlformat?:string){
    urlformat = '/%monthnum%/%hour%/%minute%/%post_id%/%postname%/';

    if(data && data.posts) {
      for(let _i in data.posts) {
        var tmp_date = new Date(data.posts[_i].post_date);
        var _tokens = {
          '%year%': tmp_date.getFullYear(),
          '%monthnum%': ("0" + (tmp_date.getMonth() + 1)).slice(-2),
          '%day%': ("0" + tmp_date.getDate()).slice(-2),
          '%postname%': data.posts[_i].post_name,
          '%post_id%': data.posts[_i].ID,
          '%hour%': ("0" + tmp_date.getHours()).slice(-2),
          '%minute%': ("0" + tmp_date.getMinutes()).slice(-2),
          '%second%': ("0" + tmp_date.getSeconds()).slice(-2), 
        };
        var tmp_url = urlformat;
        for(let _find in _tokens) {
          tmp_url = tmp_url.split(_find).join(_tokens[_find]);
        }
        //add it to posts
        data.posts[_i].post_url = tmp_url.replace(/\/$/, "").replace(/^\/+/, '');
        var _route = {
          url: data.posts[_i].post_url,
          component: "PostComponent",
          id: data.posts[_i].ID
        };
        this.URLs.push(_route);
      }
      return data;
    }
  }

  //load entities by filters and return order by 
  loadEntity(entity_type: string, filters?: any, orderBy?: any, limit?: number){
    var nsql = nSQL().query("select").from(this.dbData[entity_type]).where(filters);
    if(orderBy) {
      nsql.orderBy(orderBy); 
    }
    if(limit) {
      nsql.limit(limit).offset(0);
    }
    return nsql.exec()
      .then((rows)=>{
        return rows;
    }).catch((error) => {
      
    });        
  }

  getEntityByID(entity_type: string, entity_id: number, entity_id_key: string = 'ID') {
    var filters: Array<any> = [
      [entity_id_key,"=",entity_id]
    ];
    return this.loadEntity(entity_type, filters).then((rows)=>{
      if(rows && rows[0]) {
        return rows[0];
      }
      return false;
    }).catch((error) => {
      
    });
  }
  
  //Get complete User data
  getUser(user_id: number) {
    return this.getEntityByID('users', user_id);
  }
}
