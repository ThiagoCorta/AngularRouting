import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Product } from "./product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    return this.productService.getProducts().pipe(
      catchError(err => {
        const msg = `Retrieval error: ${err}`;
        console.log(err);
        return of([]);
      })
    );
  }
}
