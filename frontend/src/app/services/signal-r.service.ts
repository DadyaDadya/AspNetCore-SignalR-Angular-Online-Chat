import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { BehaviorSubject } from 'rxjs';
import { Message } from '../Model/Message';
import { Group } from '../Model/Group';
import { ISignalRService } from '../Interfaces/isignal-rservice';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements ISignalRService {

  private hubConnection: signalR.HubConnection | undefined;

  private connectedSource = new BehaviorSubject<boolean>(false);
  connected$ = this.connectedSource.asObservable();

  private messagesSource = new BehaviorSubject<Message>(new Message('', 'Вы успешно присоединилсь к чату'));
  message$ = this.messagesSource.asObservable();

  private NameWithGroup: Group = new Group();
  
  public startConnection(){
     this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7150/chat")
            .withAutomaticReconnect()
            .build();
            console.log(this.hubConnection)

      this.hubConnection
      .start()
      .then(
        () => {
          console.log('Соединение установлено');
        }
      ).catch(err => console.log("Ошибка при установке соединения: " + err));
      }

  public recieveMessage(){
    this.hubConnection?.on("RecieveMessage", (name, text) => {
      this.messagesSource.next(new Message(name, text));
    })}

  public loginUser(NameWithGroup: Group){
    this.NameWithGroup = NameWithGroup;
      this.hubConnection?.invoke("RegisterUser", NameWithGroup).then(
        () => {
          console.log("Человек зарегался")
          this.connectedSource.next(true);
        }
      ).catch(err => console.log("ошибка при регистрации " + err))
  };

  public sendMessage(text: string){
    this.hubConnection?.invoke("Send",this.NameWithGroup, text)
      .catch(err => console.log("Ошибка при отправке сообщения "+err));
  }

  public closeChat(){
    if(this.hubConnection?.connectionId != null){ 
      this.sendMessage("Вышел из чата");
      this.connectedSource.next(false);
      this.hubConnection?.stop();
      console.log("Соединение закрыто ");
    }
    else{
      console.log("Ошибка закрытия соединения, соединения нет");
      this.connectedSource.next(false);
    }
  }
}
