import { NgModule } from "@angular/core";

import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { ProductResolver } from "./product-resolver.service";
import { ProductEditInfoComponent } from "./product-edit/product-edit-info.component";
import { ProductEditTagsComponent } from "./product-edit/product-edit-tags.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductListResolver } from "./product-list-resolver.service";
import { AuthGuard } from "../user/auth.guard";
import { ProductEditGuard } from "./product-edit/product-edit.guard";

@NgModule({
  imports: [
    SharedModule,
    
    RouterModule.forChild([
      {
        path: "",
        component: ProductListComponent,
        resolve: { products: ProductListResolver }
      },
      {
        path: ":id",
        component: ProductDetailComponent,
        resolve: { product: ProductResolver }
      },
      {
        path: ":id/edit",
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard],
        resolve: { product: ProductResolver },
        children: [
          { path: "", redirectTo: "info", pathMatch: "full" },
          {
            path: "info",
            component: ProductEditInfoComponent
          },
          { path: "tags", component: ProductEditTagsComponent }
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [ProductResolver]
})
export class ProductModule {}
