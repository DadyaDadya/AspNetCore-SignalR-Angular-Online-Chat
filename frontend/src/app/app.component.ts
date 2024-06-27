import { Component, Inject, OnInit } from '@angular/core';
import { LoginComponent } from './logincomponent/login/login.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat/chat.component';
import { ISignalRService, SIGNALR_SERVICE_TOKEN } from './Interfaces/isignal-rservice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, ChatComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  connection : boolean = false;



  constructor(@Inject(SIGNALR_SERVICE_TOKEN) private signalRService: ISignalRService) { }
  ngOnInit(): void {
    this.signalRService.connected$.subscribe(connected=>
      {
        this.connection = connected;
      });
  }
}
