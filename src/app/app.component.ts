import { Component } from "@angular/core";

import { AuthService } from "./user/auth.service";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RouterEvent
} from "@angular/router";
import { slideInAnimation } from "./app.animation";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { MessageService } from "./messages/message.service";

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = "Acme Product Management";
  loading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {
    router.events.subscribe((routerEvent: Event) =>
      this.checkRouterEvent(routerEvent)
    );
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return "";
  }
  get isMessageDisplay(): boolean {
    return this.msgService.isDisplayed;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(["./welcome"]);
    console.log("Log out");
  }

  checkRouterEvent(event: Event) {
    if (event instanceof NavigationStart) this.loading = true;
    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      RouterEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ["messages"] } }]);
    this.msgService.isDisplayed = true;
  }

  hideMessages(): void {
    this.msgService.close();
  }
}
