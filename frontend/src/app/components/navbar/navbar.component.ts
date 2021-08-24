import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: any;

  constructor(private authSvc:AuthService) {
    this.user = this.authSvc.getUserData();
  }

  ngOnInit(): void {
  }

  public logOut(){
    console.log('LOG OUT')
    if(confirm('Esta seguro de cerrar la sesión?'))this.authSvc.onLogOut();
  }

  public isLogged(){
    return this.authSvc.isLogged();
  }


}
