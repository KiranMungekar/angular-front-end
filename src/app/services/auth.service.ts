import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri="http://localhost:3000/";
  constructor(private http:HttpClient) { }

  getGoogleAuth(){
    return this.http.get(this.uri+'api/auth/google');
  }

  register(authData):Observable<HttpResponse<any>>{
    const data={
      name:authData.name,
      email:authData.email,
      password:authData.password
    
    }
    return this.http.post(this.uri+'api/auth/register/',data, {observe:'response'})
  }
}
