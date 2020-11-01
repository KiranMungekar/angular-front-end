import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    
    path:'movie/:id',
    component:MovieEditComponent
  },
  {
    
    path:'addMovie',
    component:MovieEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
