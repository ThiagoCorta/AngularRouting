import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { ProductResolved } from "./product";
import { ProductService } from "./product.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = route.paramMap.get("id");
    if (isNaN(+id)) {
      const msg = `Product id was not a number${id}`;
      return of({ product: null, error: msg });
    }
    return this.productService.getProduct(+id).pipe(
      map(product => ({ product: product })),
      catchError(err => {
        const msg = `Retrieval error: ${err}`;
        console.log(err);
        return of({ product: null, error: msg });
      })
    );
  }
}
