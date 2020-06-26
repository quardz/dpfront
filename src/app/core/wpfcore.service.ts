import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as _ from 'underscore';
import { nSQL } from "@nano-sql/core";


@Injectable({
  providedIn: 'root'
})
export class WpfcoreService {
  dbStatus: number;
  dbData: any;
  URLs: Array<any> = []; //link, component, entity = posts/users, type = post/page, parameters as obj
  
  constructor(private http: HttpClient) { 
    this.dbStatus = 0;
    this.dbData = null;
  }

  public getData() {
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

    var _data_copy = data;
     
    var _metatables = ['users', 'posts', 'terms'];

    var _term_urls = {};
    
    for(let table in data) {
      //skip options table
      if(table == "options") {
        continue;
      }

      //Generate URL for terms
      if(table == "terms") {
        for(let _t in data[table]) {
          var _path = '';
          if(data[table][_t][6] == 'category' || data[table][_t][6] == 'post_tag') {
            if(data[table][_t][8]) {
              for(let _pid in data[table][_t][10]) {
                _path =  data[table][data[table][_t][10][_pid]][2] + "/" + _path;
              }
            }
            _path = data[table][_t][6] + "/" + _path  + data[table][_t][2];          
          }
          data[table][_t][11] = _path.replace(/\/$/, "").replace(/^\/+/, '');
          var _route = {
            url: data[table][_t][11],
            component: "TermComponent",
            id: data[table][_t][0],
            entity: 'term',
          };
          this.URLs.push(_route);   
          _term_urls[_route.id] = _route.url;
        }
        data[table]._describe[11] = "url";
      }
      //END : URL for terms

      //Make the array with proper key value
      var keys = data[table]['_describe'];
      var table_data_new = [];      
      for(let row_id in data[table]) {
        if(row_id != '_describe') {
          var _tmp_row = {};  
          for(let key_id in keys) {
            _tmp_row[keys[key_id]] = data[table][row_id][key_id];
          }
          if(_metatables.includes(table)) {
            _tmp_row['metatbl'] = data[table][row_id]['metatbl'];  
          }
          
          //data[table][row_id] = _tmp_row; //uncomment this to make rows group with ID
          table_data_new.push(_tmp_row);
        }
      }
      data[table] = table_data_new;
      //END : Make the array with proper key value
      

      //Generate URL for posts
      if(table == 'posts') {
        var urlformat = '/%monthnum%/%hour%/%minute%/%post_id%/%postname%/%author%/%category%/';
        var default_category = 1;
        if(data.options){
          if(data.options.permalink_structure){
            //urlformat = data.options.permalink_structure;
          }      
          if(data.options.default_category) {
            default_category = data.options.default_category;
          }
        }



        for(let _p in data.posts) {

          // Attach terms to posts
          data.posts[_p]._tags = [];
          if(data.term_relationships) {
            for(let _r in data.term_relationships) {
              if(data.term_relationships[_r][0] == data.posts[_p].ID) {
                data.posts[_p]._tags.push(data.term_relationships[_r][1]);
              }
            }
          }

          //Generating URL
          var tmp_date = new Date(data.posts[_p].post_date);
          var author = "admin";
          if(_data_copy.users && _data_copy.users[data.posts[_p].post_author] && _data_copy.users[data.posts[_p].post_author].display_name) {
            author = _data_copy.users[data.posts[_p].post_author].display_name;
          }
          var _main_category = default_category;
          if(data.posts[_p]._tags) {
            for(let _tid in data.posts[_p]._tags) {
              if(data.terms[data.posts[_p]._tags[_tid]].taxonomy == 'category' || data.terms[data.posts[_p]._tags[_tid]][6] == 'category') {
                _main_category = data.posts[_p]._tags[_tid];

              }
            }
          }

          var _tokens = {
            '%year%': tmp_date.getFullYear(),
            '%monthnum%': ("0" + (tmp_date.getMonth() + 1)).slice(-2),
            '%day%': ("0" + tmp_date.getDate()).slice(-2),
            '%postname%': data.posts[_p].post_name,
            '%post_id%': data.posts[_p].ID,
            '%hour%': ("0" + tmp_date.getHours()).slice(-2),
            '%minute%': ("0" + tmp_date.getMinutes()).slice(-2),
            '%second%': ("0" + tmp_date.getSeconds()).slice(-2), 
            '%category%': _term_urls[_main_category], 
            '%author%': author, 
          };  

          console.log("this is to test url",_term_urls, _term_urls[_main_category], _main_category, data.posts[_p].ID );

          //console.log("category for ", data.posts[_p].ID, _main_category, _term_urls[_main_category]);
      
          var tmp_url = urlformat;
          for(let _find in _tokens) {
            tmp_url = tmp_url.split(_find).join(_tokens[_find]);
          }      
          data.posts[_p].post_url = tmp_url.replace(/\/$/, "").replace(/^\/+/, '');
          var _route = {
            url: data.posts[_p].post_url,
            component: "PostComponent",
            id: data.posts[_p].ID,
            entity: 'posts',
          };
          this.URLs.push(_route);
        }//END for posts   
      }


      
    }
    
    console.log("_term_urls", _term_urls);

    var _defaultTables: string[] = ['options', 'posts', 'terms', 'term_relationships', 'users'];
    for(let table in _defaultTables) {
      if(!data.hasOwnProperty(_defaultTables[table])){
        data[_defaultTables[table]] = [];
      }
    }

    //Generate URLs for contents
    //data = this.fixPostURLsandTerms(data);

    return data;
  }


  private fixPostURLsandTerms(data:any, urlformat?:string){
    if(!data) {
      return data;
    }

    var urlformat = '/%monthnum%/%hour%/%minute%/%post_id%/%postname%/';
    if(data.options && data.options.permalink_structure){
      urlformat = data.options.permalink_structure;
    }

    var default_category = 1;
    if(data.options.default_category) {
      default_category = data.options.default_category;
    }

    if(data && data.posts) {

      for(let _i in data.posts) {

        //Create the URL 
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
          '%category%': '',
          '%author%': '', 
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


        //attach Terms to post
        data.posts[_i]._tags = [];
        if(data.term_relationships) {
          for(let _r in data.term_relationships) {
            if(data.term_relationships[_r].object_id == data.posts[_i].ID) {
              data.posts[_i]._tags.push(data.term_relationships[_r].term_taxonomy_id);
            }
          }
        } 
      }
      if(data.terms) {
        //data.terms = this.fixTerms(data.terms);
      }
      return data;
    }
  }

  //Fix terms URLs, @todo this is moved to main 
  private fixTerms(terms: any){
    var prefix = '';
    var category_base = this.getOption('category_base', 'category');
    var tag_base = this.getOption('tag_base', 'tag');
    if(terms) {
      for(let _t in terms) {
        var _tmp_url = '';
        if(terms[_t].taxonomy == "category" || terms[_t].taxonomy == "post_tag") {
          switch(terms[_t].taxonomy) {
            case "category":
              _tmp_url = _tmp_url + category_base + '/';
            break;
            case "post_tag":
              _tmp_url = _tmp_url + tag_base + '/';
            break;
          }
          if(terms[_t].parent) {

          }
          else {
            _tmp_url = _tmp_url + terms[_t].slug;
          }
        }
        terms[_t].url = _tmp_url;
      }
      return terms;
    }
    //for each term get parent 
  }

   


  getOption(option_id: number|string, _default = '') { 
    if(this.dbData && this.dbData.options && this.dbData.options[option_id]) {
      return this.dbData.options[option_id];
    }
    return _default;
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

  //Return current entity type, entity id and post types from the path.
  getCurrentpageEntity(path: string = '') {
    if(!path) {
      path = window.location.pathname.replace(/^\/+/, '');;
    }

    if(this.URLs) {
      for(let _i in this.URLs) {
        if(this.URLs[_i].url == path) {
          return this.URLs[_i];
        }
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
