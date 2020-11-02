import { HttpResponse } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private authService:AuthService) { }

  registerForm:FormGroup;

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:new FormControl('',[Validators.required, Validators.minLength(3)]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
      
    });

    //Validators.minLength(6),Validators.minLength(20)
  }


  registerUser(){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe((response:HttpResponse<any>)=>{
      console.log(response);
      if(response.body != null && !response.body['err']){
        console.log(response.body['token']);
        const token=response.body['token'];
        localStorage.setItem('token',token)
      }else{
        alert('Registration failed. Please try again');
      }
    })
  }

}
