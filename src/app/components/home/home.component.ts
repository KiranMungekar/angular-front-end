import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  
  constructor(private movieService:MovieService,
    private authService:AuthService){

}

title = 'angular-front-end';
ratingList:any[]=[{text:'All', value:0.0}, {text:'9+', value:9.0} ,{text:'8+', value:8.0},{text:'7+', value:7.0},{text:'6+', value:6},{text:'5+', value:5},{text:'4+', value:4},{text:'3+', value:3},{text:'2+', value:2},{text:'1+', value:1} ]
genreList:any[]=['Action','Advanture','Animation','Biography','Comedy'];


selectedGenre:string[]=[];

///FormControls;
movieSearch:FormControl= new FormControl('');
ratingSearch:FormControl= new FormControl();
directorSearch:FormControl= new FormControl('');
genreSearch:FormControl= new FormControl();
genreControl:FormControl= new FormControl('');


//Obs;
filteredGenre$: Observable<any[]>;

moviesList:any[]=[];


  ngOnInit(): void {
      this.initialSearch();

      this.ratingSearch.setValue(this.ratingList[0].value);
      this.genreSearch.setValue(this.genreList[0]);

      this.filteredGenre$=this.genreControl.valueChanges.pipe(     
         map((val: string | null) => {return this.filter(val)})
      )

  }


  initialSearch(){
    this.movieService.getAllMoviesList().subscribe(res=>{
      this.moviesList= res['data']['moviesList'];
      });
  }

searchMovies(){
  this.movieService.filterMovies(this.movieSearch.value, this.ratingSearch.value, this.directorSearch.value, this.genreSearch.value).subscribe(res=>{
  console.log(res);
  if(res['data'] == null || res['data']['err']){
  this.moviesList=[];
  }else{
  this.moviesList= res['data']['moviesList'];
  }
  })

}


addGenre(event:MatAutocompleteSelectedEvent){
this.selectedGenre.push(event.option.value);
} 


removeGenre(index){
this.selectedGenre.splice(index, 1);

}

deleteMovie(id){
  this.movieService.deleteMovie(id).subscribe(res=>{
    console.log(res);
    if(res['data'] != null && res['data']['movie'] != null){
      alert(res['data']['movie']['msg']);
      this.initialSearch();
      //this.redirectToHome()
    }
  });
}

signIn(){
this.authService.getGoogleAuth().subscribe(res=>{

});
}

filter(val){
  console.log('filter')
  if(val != null && val != ''){

  const valx = val.toLowerCase();  
  return this.genreList.filter(option => option.toLowerCase().includes(valx));
  }
}




}
