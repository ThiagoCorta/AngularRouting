import { Component, OnInit } from "@angular/core";

import { Product } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = "";

  _listFilter = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const filtro = this.activateRoute.snapshot.queryParamMap.get("filterBy");
    const showImg = this.activateRoute.snapshot.queryParamMap.get("showImage");
    this.listFilter = filtro ? filtro : "";
    this.showImage = showImg ? !!showImg : false;

    this.products = this.activateRoute.snapshot.data["products"];
    this.filteredProducts = this.performFilter(this.listFilter);
  }
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
