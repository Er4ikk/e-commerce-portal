import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';

export const IMPORTS =[
  HttpClientModule
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthPageComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    CartWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
