import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Product } from '../entities/product';
import { KartInfo } from '../entities/kartInfo';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss']
})
export class CartWidgetComponent implements OnInit {

  constructor(private userSvc:UserService) { }

  productList:Product[] | undefined=[]
  isLoading = false

  async ngOnInit(): Promise<void> {
    this.isLoading=true
    this.productList = await this.userSvc.getKartByUserId(this.userSvc.userId).toPromise()
    this.isLoading=false
  }

public async addToCart(product:KartInfo):Promise<void>{
    if(product != undefined){
      let kartInfo : KartInfo ={
        productId: product.productId,
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


public async removeFromCart(product:KartInfo):Promise<void>{
  if(product != undefined){
    let kartInfo : KartInfo ={
      productId: product.productId,
      userId: this.userSvc.userId
    }
    this.isLoading=true
    await this.userSvc.DeleteProductToKart(kartInfo).toPromise().then(
      (res) => window.alert("product is succesfully removed from the cart"),
      (err) => window.alert("something went wrong:" + err)
    )
    this.isLoading=false
  }
    
}


public async emptyCart(product:KartInfo):Promise<void>{
  if(product != undefined){
    let kartInfo : KartInfo ={
      productId: product.productId,
      userId: this.userSvc.userId
    }
    this.isLoading=true
    await this.userSvc.EmptyKart(this.userSvc.userId).toPromise().then(
      (res) => window.alert("Order was placed. Cart has been succesfully cleared"),
      (err) => window.alert("something went wrong:" + err)
    )
    this.isLoading=false
  }
    
}

}
