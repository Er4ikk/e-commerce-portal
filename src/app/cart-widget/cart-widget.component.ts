import { Component, Input, OnInit } from '@angular/core';
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

  @Input() productList:Product[] | undefined=[]
  @Input()isLoading = false
  totalPrice:number=0

  ngOnInit(){

    
   
  }

  public getTotalPrice():number | undefined{
    if(this.productList!=undefined && this.productList?.length >0){

      return this.productList.map(el=> el.price).reduce((x,y) => x + y)
    }
    else{
      
      return 0
    }
      
  }

public async addToCart(product:KartInfo):Promise<void>{
    if(product != undefined){
      let kartInfo : KartInfo ={
        productId: product.productId,
        userId: this.userSvc.userId.value
      }
      this.isLoading=true
      await this.userSvc.addProductToKart(kartInfo).toPromise().then(
        (res) => window.alert("product is added succesfully to the cart"),
        (err) => window.alert("something went wrong:" + err)
      )
      this.isLoading=false
    }
      
  }


public async removeFromCart(product:Product):Promise<void>{
  if(product != undefined){
    let kartInfo : KartInfo ={
      productId: product.id,
      userId: this.userSvc.userId.value
    }
    this.isLoading=true
    await this.userSvc.DeleteProductToKart(kartInfo).toPromise().then(
      (res) => window.alert("product is succesfully removed from the cart"),
      (err) => window.alert("something went wrong:" + err)
    ).finally(() => this.userSvc.updatedKart$.next(true))
    this.isLoading=false
  }
    
}


public async emptyCart():Promise<void>{

    this.isLoading=true
    await this.userSvc.EmptyKart(this.userSvc.userId.value).toPromise().then(
      (res) => window.alert("Order was placed. Cart has been succesfully cleared"),
      (err) => window.alert("something went wrong:" + err)
    ).finally(() => this.userSvc.updatedKart$.next(true))
    this.isLoading=false
  }
    


}
