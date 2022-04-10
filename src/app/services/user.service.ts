import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  helper = new JwtHelperService();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  url = "http://localhost:5000";
  
  constructor(private http : HttpClient, 
    private router: Router,
    private message: NzMessageService) { }

  getCurrentUserListCart() : Observable<any>{
    let api = `${this.url}/api/v1/users/current-user`;
    return this.http.get<any>(api);
  }

  login(form : any){
    // const decodedToken = this.helper.decodeToken(myRawToken);
    // const expirationDate = this.helper.getTokenExpirationDate(myRawToken);
    // const isExpired = this.helper.isTokenExpired(myRawToken);

    let api = `${this.url}/api/v1/sign-in`;
    return this.http.post<any>(api, form)
        .subscribe((res : any) => {
          localStorage.setItem('access_token', res.data);
          if(res.status === 'ok'){
            this.message.create('success', 'Đăng nhập thành công');
            window.location.href = "/";
          }
          else{
            this.message.create('warning', 'Đăng nhập thất bại');
          }
          console.log(res);
        });
  }

  repeat(){
    console.log("Before Print");
  }


  sendMail(mail : any){
    this.http.post(this.url + "/api/v1/send-mail", mail);
    this.message.create('success', 'Gửi email thành công. Vui lòng kiểm tra email');

  }

  register(form : any) {
    this.http.post<any>(this.url + "/api/v1/sign-up", form).subscribe(
      resp => {
        if(resp.status === 'ok'){
          this.message.create('success', 'Đăng ký thành công');
          this.router.navigate(['/']);
        }
      });
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      } else {
        // server-side error
        this.message.create('warning', 'Đăng ký thất bại');
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    return throwError(msg);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  clearCache(){
    localStorage.clear();
  }

  addTokenToCache(name: string, token : string){
    localStorage.removeItem(name);
    localStorage.setItem(name, token);
  }

  getRefreshTokenFromCache(){
    return localStorage.getItem("refresh_token");
  }

  getAccessTokenFromCache(){
    return localStorage.getItem("access_token");
  }

  addUserFromTokenToCache(token : string){
    let decodeToken = this.helper.decodeToken(token);
    this.addTokenToCache("user", decodeToken.sub);
    console.log(decodeToken.sub);
    //this.helper.decodeToken(token);
  }

  getUserFromCache(){
    return localStorage.getItem("user");
  }

  expirationDateToken(token : string){
    return this.helper.getTokenExpirationDate(token);
  }

  isExpired(token : string){
    return this.helper.isTokenExpired(token);
  }

  logout(){
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
