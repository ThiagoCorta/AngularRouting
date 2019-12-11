import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
  CanLoad,
  UrlSegment,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkIfIsLoggedIn(route.path);
  }
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkIfIsLoggedIn(state.url);
  }

  checkIfIsLoggedIn(url: string) {
    const isLogg = this.auth.isLoggedIn;
    if (isLogg) return true;
    window.alert("Necesitas logearte para hacer algo amigo");
    this.auth.redirectUrl = url;
    this.router.navigate(["/login"]);
  }
}
