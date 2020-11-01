import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { RegisterComponent } from './components/register/register.component';

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
  },
  {
    path:'signin',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
