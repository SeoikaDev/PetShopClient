import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  api = environment.apiEndpoint;

  constructor(private http : HttpClient) { }

  getServiceById(id :  any){
    return this.http.get<any>(this.api + `services/${id}`);
  }

  getServices(){
    return this.http.get<any>(this.api + "services");
  }

  getServicesByCategory(){
    return this.http.get<any>(this.api + "services/category");
  }

  addServices(service : any){
    return this.http.post<any>(this.api + "services", service);
  }

  updateServices(service : any){
    return this.http.put<any>(this.api + "services", service);
  }

  deleteServices(id : any){
    return this.http.delete<any>(this.api + `services/${id}`,);
  }


}
