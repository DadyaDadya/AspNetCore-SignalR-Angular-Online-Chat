export class Message{
    name: string | undefined;
    text: string | undefined;
    constructor(name: string, text: string){
        this.name = name;
        this.text = text;
    }
}