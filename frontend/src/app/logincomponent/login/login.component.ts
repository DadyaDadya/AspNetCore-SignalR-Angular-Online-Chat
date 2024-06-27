import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Group } from '../../Model/Group';
import { ISignalRService, SIGNALR_SERVICE_TOKEN } from '../../Interfaces/isignal-rservice';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(@Inject(SIGNALR_SERVICE_TOKEN) private signalRService: ISignalRService) { }

  ngOnInit() {
    this.signalRService?.startConnection();
  }
  
  group : Group = new Group();
  loginUser(){
    if(this.group.name != null && this.group.chat != null){
      this.signalRService.loginUser(this.group); 
    }
  }
}