import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as _ from 'underscore';
import { nSQL } from "@nano-sql/core";
import * as JsSearch from 'js-search';


@Injectable({
  providedIn: 'root'
})
export class WpfcoreService {
  dbStatus: number;
  loaded: boolean = false;
  dbData: any;
  URLs: Array<any> = []; //link, component, entity = posts/users, type = post/page, parameters as obj
  mapIndex_Pk: Array<any> = []; // It contains the map between primary key and index
  archives: Array<any> = [];
  themes: any = {};
  currenttheme: Subject<string>;
  
  public showSpinner: boolean = false;


  constructor(private http: HttpClient) { 
    this.dbStatus = 0;
    this.dbData = null;

    var _theme = 'TwentytwelveComponent';
 
    this.currenttheme = new Subject<any>();//.asObservable(); 
    
    this.currenttheme.next('TwentytwelveComponent');

    this.themes = {
      TwentytwelveComponent: 'Twenty Twelve', 
      ThemeauthorComponent: 'Author',
    };

  }

  public getThemes() { 
    return this.themes;
  }

  public setTheme(theme) {
    this.currenttheme.next(theme);
  }

  public getTheme() {
    return this.currenttheme;
  }  

  public getData() {  
    return this.dbData; 
  }

  public isLoaded() {
    return this.loaded;
  }

  public getURLs() {
    return this.URLs;
  }

  public getMapIndex_Pk() {
    return this.mapIndex_Pk;
  }

  public getArchives() {
    return this.archives;
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }


  //load the json data from server
  load() {
    return new Promise((resolve, reject) => {
      this.showLoadingSpinner();

      this.http
        .get('/db.json')
        .subscribe(response => {

          this.dbData = this.fixData(response);
          console.log("after loading and fixing", this.dbData);
          this.dbStatus = 1;
          this.loaded = true;
          this.hideLoadingSpinner();

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

    var tablePKs = {
      'users': 'ID',
      'posts': 'ID',
      'terms': 'term_id',
    }

    var _post_types_to_display = ['page', 'post'];
    var  _archives = [];

    var _url_category_base = this.getOption('category_base', 'category');
    var _url_tag_base = this.getOption('tag_base', 'tag');    

    //Generate URL for terms
    if(data.terms) {
      for(let _t in data.terms) {
        var _path = '';
        if(data.terms[_t][6] == 'category' || data.terms[_t][6] == 'post_tag') {
          if(data.terms[_t][8]) {
            for(let _pid in data.terms[_t][10]) {
              _path =  data.terms[data.terms[_t][10][_pid]][2] + "/" + _path;
            }
          }
          if(data.terms[_t][6] == 'category') {
            _path = _url_category_base + "/" + _path  + data.terms[_t][2];            
          }
          if(data.terms[_t][6] == 'post_tag') {
            _path = _url_tag_base + "/" + _path  + data.terms[_t][2];            
          }
          
        }
        data.terms[_t][12] = _path.replace(/\/$/, "").replace(/^\/+/, '');
        //data.terms[_t][12] = "/" +  _path
        var _route = {
          url: data.terms[_t][12], 
          component: "TermComponent",
          id: data.terms[_t][0],
          entity: 'terms',
        };
        this.URLs.push(_route);   
        _term_urls[_route.id] = _route.url;
      }
      data.terms._describe[12] = "url";
    }
    //END : URL for terms

    //Contents belongs to terms
    
    for(let table in data) {
      //skip options table
      if(table == "options") {
        continue;
      }
      
      var mapIndex_Pk_key = tablePKs[table] ? tablePKs[table] : 0;
      if(mapIndex_Pk_key) {
        this.mapIndex_Pk[table] = {};  
      }
      

      //Make the array with proper key value
      var keys = data[table]['_describe'];
      var table_data_new = [];      
      var _row_counter = 0;
      for(let row_id in data[table]) {
        if(row_id != '_describe') {
          var _tmp_row = {};  
          for(let key_id in keys) {
            _tmp_row[keys[key_id]] = data[table][row_id][key_id];
          }
          if(_metatables.includes(table)) {
            _tmp_row['metatbl'] = data[table][row_id]['metatbl'];  
          }
          //Map Key to index
          if(mapIndex_Pk_key) {
            this.mapIndex_Pk[table][_tmp_row[mapIndex_Pk_key]] = _row_counter; 
          }
          

          //data[table][row_id] = _tmp_row; //uncomment this to make rows group with ID
          table_data_new.push(_tmp_row);
          _row_counter++;


        }
      }
      data[table] = table_data_new;
      //END : Make the array with proper key value
      

      //Generate URL for posts
      if(table == 'posts') {
        var urlformat = '?p=/%post_id%';
        var default_category = 1;
        if(data.options){
          if(data.options.permalink_structure){
            urlformat = data.options.permalink_structure;
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

          var _post_month = tmp_date.getMonth();
          var _post_year = tmp_date.getFullYear();

          var _tokens = {
            '%year%': _post_year,
            '%monthnum%': ("0" + (_post_month + 1)).slice(-2),
            '%day%': ("0" + tmp_date.getDate()).slice(-2),
            '%postname%': data.posts[_p].post_name,
            '%post_id%': data.posts[_p].ID,
            '%hour%': ("0" + tmp_date.getHours()).slice(-2),
            '%minute%': ("0" + tmp_date.getMinutes()).slice(-2),
            '%second%': ("0" + tmp_date.getSeconds()).slice(-2), 
            '%category%': _term_urls[_main_category].replace("category", ""), 
            '%author%': author, 
          };  
      
          var tmp_url = urlformat;
          for(let _find in _tokens) {
            tmp_url = tmp_url.split(_find).join(_tokens[_find]);
          }      
          data.posts[_p].post_url = tmp_url.replace(/\/$/, "").replace(/^\/+/, "").replace("//", "/");
          //data.posts[_p].post_url = "/" + tmp_url.replace("//", "/");

          // for pages, just use slug
          if(data.posts[_p].post_type == 'page') {
            data.posts[_p].post_url = data.posts[_p].post_name; 
          }
          var _route = {
            url: data.posts[_p].post_url,
            component: "PostComponent",
            id: data.posts[_p].ID,
            entity: 'posts',
          };
          this.URLs.push(_route);

          //Create Archive list
          
          if(data.posts[_p].post_status == "publish" && data.posts[_p].post_type == 'post') {
            var _date_key = _post_year + '/' + ("0" + (_post_month + 1)).slice(-2);
            
            if(_archives[_date_key]) {
              _archives[_date_key].push(data.posts[_p].ID);
            }
            else {
              _archives[_date_key] = [data.posts[_p].ID]; 
            }
          } 
        }//END for posts   
      }


      
    } // END of for loop on each tables 




    //End : content per terms
    
    var _defaultTables: string[] = ['options', 'posts', 'terms', 'term_relationships', 'users'];
    for(let table in _defaultTables) {
      if(!data.hasOwnProperty(_defaultTables[table])){
        data[_defaultTables[table]] = [];
      }
    }

    //Generate URLs for contents
    //data = this.fixPostURLsandTerms(data);

    //Push other URLs 
    var _search_url = {
      url: 'search/:key', 
      component: "WppageComponent",
      id: 0,
      entity: 'search',
    };
    this.URLs.push(_search_url); 

    //Push Archives URLs
    /*
    var _search_url = {
      url: 'date/:year/:month', 
      component: "WppageComponent",
      id: 0,
      entity: 'archive',
    };
    this.URLs.push(_search_url);  
    */

    this.archives = _archives;
    if(_archives) {
      for(let _date in _archives) {
        this.URLs.push({
          url: 'date/' + _date, 
          component: "WppageComponent",
          id: _date,
          entity: 'archive',
        });
      }
    }

    return data;
  }

  generateArchives() { 
    var archives = {};
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
      return data;
    }
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
    if(this.dbData.posts) {
      var posts = [];
      for(let _index in this.dbData.posts) {
        if(this.dbData.posts[_index].post_type == post_type && this.dbData.posts[_index].post_status == "publish") {
          posts.push(this.dbData.posts[_index].ID);
        }
      }
      var recent_posts = posts.sort((a,b) => b-a);
      if(recent_posts) {
        return recent_posts;
      }
    }
    return false;
  }

  //Get the current theme regions
  getRegions(theme?: string) {

  }

  //Get widgets for given theme
  getWidgets(theme?: string) {

  }


  getCategory(taxanomy: string = 'category') {
    var output = [];
    for(let _t in this.dbData.terms) {
      if(this.dbData.terms[_t].taxonomy == taxanomy) {
        output.push(this.dbData.terms[_t]);
      }
    }
    return output;
  }

  //Get term data
  getTerm(term_id: number) {
    return this.getEntityByID('terms', term_id);
  }  

  //Get post data
  getPost(post_id: number){
    return this.getEntityByID('posts', post_id);
  }

  searchPosts(keyword: string) {
    var resu = null;
    var search = new JsSearch.Search('post_content');
    search.addIndex('post_content');
    search.addIndex('post_title');
    search.addIndex('post_url');

    search.addDocuments(this.dbData.posts);   

    return search.search(keyword);      
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

  getEntityByID(entity_type: string, entity_id: number) {
    if(this.mapIndex_Pk[entity_type][entity_id] !== undefined) { 
      let _index = this.mapIndex_Pk[entity_type][entity_id]
      return this.dbData[entity_type][_index];
    }
    return false;
  }
  
  //Get complete User data
  getUser(user_id: number) {
    return this.getEntityByID('users', user_id);
  }
}
