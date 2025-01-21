import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, Subscription, tap } from 'rxjs';
import { User, UserInfo } from '../entities/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit,OnDestroy {

  fistName:FormControl =new FormControl('')
  lastName:FormControl =new FormControl('')
  subscriptions:Subscription[]=[]
  isLoading:boolean=false;

  constructor(
    private userSvc:UserService,
    private router:Router ) { }
  

  ngOnInit(): void {
  }

  public auth(){
    this.isLoading=true
   let fistName:string= this.fistName.value.trim()
   let lastName:string= this.lastName.value.trim()
   let userInfo:UserInfo ={
     firstName: fistName,
     lastName: lastName
   }

   this.subscriptions.push(
   this.userSvc.auth(userInfo).pipe(
    catchError((val) => of(val)),
    map((u:User) => u.id),
    tap((id:string) =>this.userSvc.userId.next(id)),
    tap(() => console.log(this.userSvc.userId.value))
   ).subscribe(val => {

    if(val == undefined){
      window.alert("something went wrong: " +val)
    }
    else{
      window.alert("login succesful")
      this.router.navigate(['products'])
    }
      this.isLoading=false
  }) )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe())
  }


}
