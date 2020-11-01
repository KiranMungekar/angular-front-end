import { HttpClient, HttpParams } from '@angular/common/http';
import { partitionArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {filterModel} from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  uri="http://localhost:3000/"
  constructor(private http:HttpClient) { }

  getAllMoviesList():Observable<any>{
    return this.http.get(this.uri+'api/movies/all');
  }

  filterMovies(name, rating, director, genre){
    const data=new filterModel('',name, rating, director, genre);
    return this.http.post(this.uri+'api/movies/browse/',data);
  }

  addMovie(movie:filterModel){
   // const data=new filter('',name, rating, director, genre);
    return this.http.post(this.uri+'api/movies/browse/',movie);
  }

  getMovie(id:String){
    return this.http.get(this.uri+'api/movies/browser/?id='+id);
  }

  updateMovie(movie:filterModel){
    // const data=new filter('',name, rating, director, genre);
     return this.http.put(this.uri+'api/movies/browse/',movie);
  }

  deleteMovie(id:string){
    // const data=new filter('',name, rating, director, genre);
    const param= new HttpParams().append("id",id);
  
     return this.http.delete(this.uri+'api/movies/browse/',{params:param});
   }


}
