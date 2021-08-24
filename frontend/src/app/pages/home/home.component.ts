import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any;

  public actualDate: string = '';

  public actualHour: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let date = new Date();
    this.actualDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    this.actualHour = date.getHours()+':'+date.getMinutes();
    this.user = this.authService.getUserData();
  }

}
