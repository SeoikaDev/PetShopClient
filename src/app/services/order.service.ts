import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = environment.apiEndpoint;

  constructor(private http : HttpClient) { }

  addOrder(order : any){
    return this.http.post<any>(this.url + "order", order);
  }

  getOrders(){
    return this.http.get<any>(this.url + "order");
  }

  updateOrder(order : any){
    return this.http.put<any>(this.url + "order", order);
  }
}
