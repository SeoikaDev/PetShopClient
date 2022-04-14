import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  api = environment.apiEndpoint;
  list : any[] = [];
  constructor(private http : HttpClient) { }

  addCart(product : any){
    let ProductModel = {
      id : product._id,
      amount : 1,
    }
    return this.http.post<any>(this.api + "cart",  ProductModel);
  }

  updateCart(cart : any){
    return this.http.put<any>(this.api + "cart", cart);
  }

  deleteCart(id : any){
    return this.http.delete<any>(this.api + `cart/${id}`);
  }

  clearCart(){
    return this.http.delete<any>(this.api + "cart/delete/all");
  }
}


