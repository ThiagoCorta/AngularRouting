import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private _messages: string[] = [];
  isDisplayed = false;

  constructor(private router: Router) {}
  get messages(): string[] {
    return this._messages;
  }

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(message + " at " + currentDate.toLocaleString());
  }

  close() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.isDisplayed = false;
  }
}
