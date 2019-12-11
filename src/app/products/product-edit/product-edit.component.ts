import { Component, OnInit } from "@angular/core";

import { MessageService } from "../../messages/message.service";

import { Product, ProductResolved } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { slideInAnimation } from "src/app/app.animation";

@Component({
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"]
})
export class ProductEditComponent implements OnInit {
  public pageTitle = "Product Edit";
  public errorMessage: string;
  private dataIsValid: { [key: string]: boolean } = {};
  private currentProduct: Product;
  private originalProduct: Product;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      const productData: ProductResolved = data["product"];
      this.errorMessage = productData.error;
      this.onProductRetrieved(productData.product);
    });
  }

  get product(): Product {
    return this.currentProduct;
  }

  set product(value: Product) {
    this.currentProduct = value;
    this.originalProduct = {
      price: value.price,
      productCode: value.productCode,
      productName: value.productName,
      id: value.id,
      imageUrl: value.imageUrl,
      category: value.category,
      description: value.description,
      releaseDate: value.releaseDate,
      starRating: value.starRating,
      tags: value.tags
    };
    console.log(this.currentProduct, this.originalProduct);
  }

  get isDirty(): boolean {
    return (
      JSON.stringify(this.originalProduct) !==
      JSON.stringify(this.currentProduct)
    );
  }

  reset(): void {
    this.currentProduct = undefined;
    this.originalProduct = undefined;
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = "No product found";
    } else {
      if (this.product.id === 0) {
        this.pageTitle = "Add Product";
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => (this.errorMessage = err)
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true)
    );
  }
  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product.productName} was saved`
            ),
          error: err => (this.errorMessage = err)
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The updated ${this.product.productName} was saved`
            ),
          error: err => (this.errorMessage = err)
        });
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.router.navigate(["/products"]);
  }

  validate(): void {
    this.dataIsValid = {};

    if (
      this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid["info"] = true;
    } else {
      this.dataIsValid["info"] = false;
    }

    if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid["tags"] = true;
    } else {
      this.dataIsValid["tags"] = false;
    }
  }
}
