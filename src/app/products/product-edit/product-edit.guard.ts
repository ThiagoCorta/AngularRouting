import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { ProductEditComponent } from "./product-edit.component";

@Injectable({
  providedIn: "root"
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(
    component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (component.isDirty) {
      const productName = component.product.productName || "new product";
      return window.confirm(
        `Navigate away and lose all changes to ${productName}`
      );
    }
  }
}
