import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { KartInfo } from '../entities/kartInfo';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
   productId:string |null ="";
  product : Product | undefined;
  isLoading:boolean = false
  constructor(
    private productSvc:ProductService,
    private route: ActivatedRoute,
    private userSvc: UserService) { }

  async ngOnInit() {
    this.productId=this.route.snapshot.paramMap.get('id')
    if(this.productId!=undefined){
      this.product = await this.productSvc.getProductById(this.productId).toPromise()
    }
  }

  public async addToCart():Promise<void>{
    if(this.product != undefined){
      let kartInfo : KartInfo ={
        productId: this.product.id,
        userId: this.userSvc.userId
      }
      this.isLoading=true
      await this.userSvc.addProductToKart(kartInfo).toPromise().then(
        (res) => window.alert("product is added succesfully to the cart"),
        (err) => window.alert("something went wrong:" + err)
      )
      this.isLoading=false
    }
      
  }

}
