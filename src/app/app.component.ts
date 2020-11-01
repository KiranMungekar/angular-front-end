import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { MovieService } from './services/movie.service';
import {map, startWith} from 'rxjs/operators/'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  title='MoviesApp'
}
