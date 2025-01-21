import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Product } from '../entities/product';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  productList:Product[] | undefined=[]
  isLoading =false
  userName:string ="user-"
  subscriptions:Subscription[] = []

  constructor(private userSvc: UserService) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe())
  }
  isCartVisible :boolean = false
  async ngOnInit() {

    this.subscriptions.push(
    this.userSvc.userId.pipe(
      tap(async (userId:string) => {
        this.isLoading=true
        this.userName="user-" + userId
        this.productList = await this.userSvc.getKartByUserId(this.userSvc.userId.value).toPromise()
        this.isLoading=false
      })

    ).subscribe())
    
    this.subscriptions.push(
    this.userSvc.updatedKart$
    .pipe(
      tap(async () => {
        this.isLoading=true
        this.productList = await this.userSvc.getKartByUserId(this.userSvc.userId.value).toPromise()
        this.isLoading=false
      })
    ).subscribe())



    
    
   

    

    // this.userSvc.getAllUsers().subscribe()
  }

  public onCartToggle():void{
    this.isCartVisible=!this.isCartVisible
  }

}
