import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Product } from '../entities/product';
import { ProductService } from '../services/product.service';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList$!:Observable<Product[]>;
  productlistSize:number=9;
 

  constructor(private productSvc:ProductService) { }

  ngOnInit(): void {
    this.productList$ = this.productSvc.getProducts();

  }

  public loadMore():void{
    this.productlistSize+=9
  }

}
