import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm:FormGroup;

  public errorMsg: string = '';

  public existError: boolean = false;

  constructor(private authSvc: AuthService,private router: Router) {
    this.signUpForm = this.createSignUpForm();
  }

  ngOnInit(): void {
  }

  //Sign Up
  public onSignUp(){
    const {email,username,password} = this.signUpForm.value;
    let user = {
      email:email,
      username:username,
      password:password
    };
    this.authSvc.onSignUp(user).subscribe(res => {
      localStorage.setItem('token',res.token);
      this.router.navigate(['/home']);
    },err => this.mostrarError(err.error.message))
  }

  //Crear Formulario
  createSignUpForm(){
    const emailPattern =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new FormGroup({
      email: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern(emailPattern)]),
      username: new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(25)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(36)]),
    })
  }
  //Getters
  get email(){return this.signUpForm.get("email");}
  get username(){return this.signUpForm.get("username");}
  get password(){return this.signUpForm.get("password");}

  //Toast
  public mostrarError(msg: string) {
    this.errorMsg = msg;
    this.existError = true;
    setTimeout(() => {
      this.existError = false;
      this.errorMsg = '';
    }, 3500);
  }

}
