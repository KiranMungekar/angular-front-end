import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri="http://localhost:3000/";
  constructor(private http:HttpClient) { }

  getGoogleAuth(){
    return this.http.get(this.uri+'api/auth/google');
  }
}
