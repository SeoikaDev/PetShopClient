import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  url = environment.apiEndpoint;
  constructor(private http : HttpClient) { }

  addHistory(id : any){
    return this.http.post<any>(this.url + "history", id);
  }
}
