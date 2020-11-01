import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  registerForm:FormGroup;

  ngOnInit(): void {
    this.fb.group({
      name:new FormControl('',[Validators.required, Validators.minLength(3)]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.minLength(20)])
    });
  }

}
