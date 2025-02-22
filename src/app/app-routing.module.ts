import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

const routes: Routes = [
  {
    path: 'login',
    component:AuthPageComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
