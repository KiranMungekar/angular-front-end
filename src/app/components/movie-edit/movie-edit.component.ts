
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { filterModel } from 'src/app/models/filter.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  movieId:string;
  movie:any;

  ratingList:any[]=[{text:'All', value:0.0}, {text:'9+', value:9.0} ,{text:'8+', value:8.0},{text:'7+', value:7.0},{text:'6+', value:6},{text:'5+', value:5},{text:'4+', value:4},{text:'3+', value:3},{text:'2+', value:2},{text:'1+', value:1} ]
  genreList:any[]=['Action','Advanture','Animation','Biography','Comedy'];

  addComponent:boolean;

  ///FormControls;
  id:string='';
  movieName:FormControl= new FormControl('');
  ratings:FormControl= new FormControl(0.0);
  director:FormControl= new FormControl('');
  //genres:FormControl= new FormControl();
  genres:FormControl= new FormControl('');


  //Obs;
  filterGenre$: Observable<any[]>;

  moviesList:any[]=[];
  selectedGenre:string[]=[];

  constructor(private activatedRoute:ActivatedRoute,
              private movieService:MovieService,
              private router:Router) { }



  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url.includes('addMovie')){
      this.addComponent= true;
    }else{
      if(this.activatedRoute.snapshot.paramMap.has('id')){
        this.movieId= this.activatedRoute.snapshot.paramMap.get('id');
          this.movieService.getMovie(this.movieId).subscribe(res=>{
            console.log('Movie data present..')
            
            this.movie= res['data']['movie'];
            this.id= this.movie._id;
            this.movieName.setValue(this.movie.name);
            this.movieName.disable();
            this.ratings.setValue(this.movie.imdb_score);
            this.selectedGenre= this.movie.genre;
            this.director.setValue(this.movie.director) ;

          });
      }else{
        console.log('No movie found..');
      }
    }

    this.filterGenre$=this.genres.valueChanges.pipe(     
      map((val: string | null) => {return this._filter(val)})
   )
    

  }


  addToGenre(event:MatAutocompleteSelectedEvent){
    this.selectedGenre.push(event.option.value);
    } 
    
    
    removeFromGenre(index){
    this.selectedGenre.splice(index, 1);
    
    }
    
  _filter(val){
    console.log('filter')
    if(val != null && val != ''){

    const valx = val.toLowerCase();  
    return this.genreList.filter(option => option.toLowerCase().includes(valx));
    }
  }

  redirectToHome(){
    this.router.navigate(['/'])
  }

  done(){
    const movie:filterModel= new filterModel(this.id,this.movieName.value,this.ratings.value,this.director.value,this.selectedGenre)
    if(this.addComponent != undefined && this.addComponent){
      //Add component;
      this.movieService.addMovie(movie).subscribe(res=>{
        console.log(res);
        if(res['data'] != null && res['data']['movie'] != null){
          alert(res['data']['movie']['msg']);
          this.redirectToHome()

        }
      })
    }else{
      //const movie:filterModel= new filterModel('',this.movieSearch.value,this.ratingSearch.value,this.directorSearch.value,this.genreList)
      this.movieService.updateMovie(movie).subscribe(res=>{
        console.log(res);
        if(res['data'] != null && res['data']['movie'] != null){
          alert(res['data']['movie']['msg']);
          this.redirectToHome()
        }
      })
    }
  }

}
