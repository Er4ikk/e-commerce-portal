import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private baseUrl ="/api/Product"

  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/GetProducts");
  }


  public getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(this.baseUrl+"/GetProductById/"+id);
  }

  public createItem(product:Product):Observable<void>{
    return this.http.post<void>(this.baseUrl+"/Create",product)
  }

  public updateProduct(product:Product):Observable<void>{
    return this.http.patch<void>(this.baseUrl+"/UpdateProduct",product)
  }

  public PatchProduct(product:Product):Observable<void>{
    return this.http.patch<void>(this.baseUrl+"/PatchProduct",product)
  }

  public PatchProducts(products:Product[]):Observable<void>{
    return this.http.patch<void>(this.baseUrl+"/PatchProducts",products)
  }

  public deleteById(id:string):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/DeleteById/"+id)
  }
}
