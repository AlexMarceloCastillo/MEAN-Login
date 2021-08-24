import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = "http://localhost:2021/api";

  constructor(private httpClient: HttpClient,private router: Router) { }

  public onSignIn(usuario: any):Observable<any>{
    return this.httpClient.post<any>(this.URL+'/signIn',usuario);
  }

  public onSignUp(usuario: any):Observable<any>{
    return this.httpClient.post<any>(this.URL+'/signUp',usuario);
  }

  public isLogged(){
    return !!localStorage.getItem('token') && this.validateTokenDecoded();
  }

  public onLogOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  public getUserData(){
    let user: any ={
      uid:'',
      email:'',
      username:''
    };
    const token = localStorage.getItem('token')
    if(token){
      let payload = token.split('.')[1]
      payload = window.atob(payload)
      user = JSON.parse(payload)
    }
    return user;
  }

  //Token Validation
  public validateTokenDecoded(){
    try{
      let token = localStorage.getItem('token');
      if(token){
        window.atob(token.split('.')[1]);
        return true;
      }else{
        localStorage.removeItem('token');
        return false;
      }
    }catch(e){
      localStorage.removeItem('token');
      return false;
    }
  }

}
