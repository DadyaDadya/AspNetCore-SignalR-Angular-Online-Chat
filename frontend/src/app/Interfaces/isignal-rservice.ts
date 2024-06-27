import { Observable } from "rxjs";
import { Group } from "../Model/Group";
import { Message } from "../Model/Message";
import { InjectionToken } from "@angular/core";

export interface ISignalRService {
    connected$: Observable<boolean>;
    message$: Observable<Message>;
    startConnection(): void;
    recieveMessage(): void;
    loginUser(NameWithGroup: Group): void;
    sendMessage(text: string): void;
    closeChat(): void;
}

export const SIGNALR_SERVICE_TOKEN = new InjectionToken<ISignalRService>('ISignalRService');
