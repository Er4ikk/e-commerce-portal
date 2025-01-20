import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { ProductService } from '../services/product.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList$!:Observable<Product[]>;
 

  constructor(private productSvc:ProductService) { }

  ngOnInit(): void {
    this.productList$ = this.productSvc.getProducts().pipe(
      take(10)
    );

  }

}
