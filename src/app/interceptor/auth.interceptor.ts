import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from "@angular/common/http";
import { UserService } from "../services/user.service";
import { NzMessageService } from "ng-zorro-antd/message";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,
      private message: NzMessageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userService.getAccessTokenFromCache();
        if(authToken != null){
          req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        }else{
          this.message.create('success', "Vui lòng đăng nhập");
        }
        
        return next.handle(req);
    }
}
