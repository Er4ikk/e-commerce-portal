import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserInfo } from '../entities/user';
import { Product } from '../entities/product';
import { KartInfo } from '../entities/kartInfo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userId:BehaviorSubject<string>= new BehaviorSubject("d75f463b-3d0d-47e0-bae1-abb23690f635");
  updatedKart$:BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private http:HttpClient) { }

  public getAllUsers():Observable<User[]>{
    return this.http.get<User[]>("/api/User/GetUsers");
  }

  public getKartByUserId(id:string):Observable<Product[]>{
    return this.http.get<Product[]>("/api/User/GetKartByUserId/"+id);
  }


  public auth(user:UserInfo):Observable<User>{
    return this.http.post<User>("/api/User/Auth",user);
  }


  public addProductToKart(kartItem:KartInfo):Observable<void>{
    return this.http.post<void>("/api/User/AddProductToKart",kartItem);
  }
  
  public DeleteProductToKart(kartItem:KartInfo):Observable<void>{
    return this.http.delete<void>("/api/User/DeleteProductFromKart",{body:kartItem});
  }

  public EmptyKart(userId:string):Observable<void>{
    return this.http.delete<void>("/api/User/EmptyKart/"+userId);
  }
}
