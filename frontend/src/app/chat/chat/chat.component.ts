import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Message } from '../../Model/Message';
import { ISignalRService, SIGNALR_SERVICE_TOKEN } from '../../Interfaces/isignal-rservice';

@Component({
  selector: 'chat-component',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  messagesArray: Message[] = [];
  newMessage: string = '';

  ngOnInit(): void {
    this.signalRService?.recieveMessage();
    this.signalRService.message$.subscribe(message =>{
      this.messagesArray.push(message);
    });
  }

  constructor(@Inject(SIGNALR_SERVICE_TOKEN) private signalRService: ISignalRService) { }

  closeChat(){
    this.signalRService.closeChat();
  }

  sendMessage(){
    this.signalRService.sendMessage(this.newMessage);
  }
}
