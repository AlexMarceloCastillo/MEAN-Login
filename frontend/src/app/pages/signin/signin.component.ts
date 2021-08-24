import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signInForm:FormGroup;

  public errorMsg: string = '';

  public existError: boolean = false;

  constructor(private authSvc:AuthService,private router:Router) {
    this.signInForm = this.createSignIpForm();
  }

  ngOnInit(): void {
  }

  //Sign In
  public onSignIn(){
    const {email,username,password} = this.signInForm.value;
    let user = {
      email:email,
      username:username,
      password:password
    };
    this.authSvc.onSignIn(user).subscribe(res => {
      localStorage.setItem('token',res.token);
      this.router.navigate(['/home']);
    },err => {console.log(err);this.mostrarError(err.error.message)})
  }

  //Crear Formulario
  createSignIpForm(){
    const emailPattern =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new FormGroup({
      email: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern(emailPattern)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(36)]),
    })
  }
  //Getters
  get email(){return this.signInForm.get("email");}
  get password(){return this.signInForm.get("password");}

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
